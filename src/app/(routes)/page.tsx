"use client";
import SkeletonLoader from "@/components/skeleton-loader";
import React, { useMemo, useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { IPostModel } from "@/models/post";
import { PostCard } from "@/components/post-card";
import { Pagination, Input, Divider } from "@nextui-org/react";
import { SearchIcon } from "@/components/icons";

type FetchPost = {
  posts: IPostModel[];
  page: number;
  limit: number;
  total: number;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const { data, loading } = useFetch<FetchPost>(
    `/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(
      search
    )}&status=PUBLISHED`
  );

  useEffect(() => {
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      setSearch(search);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const displayPosts = () => {
    if (data?.posts && data?.posts.length > 0) {
      return data.posts.map((post, index) => {
        return <PostCard key={post.id} post={post} />;
      });
    } else if (!loading && !isLoading && search) {
      return (
        <div
          className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
          role="alert"
        >
          <span className="font-medium">Info!</span> Not found result.
        </div>
      );
    }
  };

  const pages = useMemo(() => {
    if (!data?.total) return 0;
    return Math.ceil(data.total / limit);
  }, [limit, data?.total]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center ">
      {/* Search */}
      <Input
        value={search}
        onChange={handleSearch}
        className="text-sm pb-5 pt-4 w-[1000px]"
        placeholder="Search..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
      />

      {/* Loading Posts and Display posts */}
      {loading || isLoading ? SkeletonLoader({ length: 5 }) : displayPosts()}

      <Divider className="my-4 w-[1000px]" />

      {/* Pagination */}
      {!loading && (
        <Pagination
          isCompact
          showControls
          total={pages}
          initialPage={page}
          page={page}
          onChange={(page) => {
            setPage(page);
          }}
        />
      )}
    </div>
  );
}
