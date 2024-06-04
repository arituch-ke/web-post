"use client";
import React from "react";
import SkeletonLoader from "@/components/skeleton-loader";
import useFetch from "@/hooks/useFetch";
import { PostCard } from "@/components/post-card";
import { IPostModel } from "@/models/post";
import { UUID } from "crypto";

type Props = {
  params: { id: UUID };
};

export default function Post({ params }: Props) {
  const { data, loading } = useFetch<{ post: IPostModel }>(
    `/posts/${params.id}`
  );

  const displayPosts = () => {
    if (data?.post) {
      return <PostCard post={data.post} viewer={false} />;
    } else if (!loading) {
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

  return (
    <div className="flex flex-col pt-5 items-center justify-center ">
      {/* Loading Post and Display posts */}
      {loading ? SkeletonLoader({ length: 1 }) : displayPosts()}
    </div>
  );
}
