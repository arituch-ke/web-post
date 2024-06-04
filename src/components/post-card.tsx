"use client";
import { CardHeader, Card, Avatar, CardBody, Chip } from "@nextui-org/react";
import { formatDate } from "../utils/formatDate";
import { IPostModel } from "@/models/post";
import DOMPurify from "dompurify";
import { useRouter } from "next/navigation";
import { UUID } from "crypto";

type Props = {
  post: IPostModel;
  viewer?: boolean;
};

export const PostCard = ({ post, viewer = true }: Props) => {
  const router = useRouter();
  const sanitizedContent = DOMPurify.sanitize(post.content);
  const goToPost = (postId: UUID) => router.push(`/posts/${postId}`);
  return (
    <div className="max-w-[1000px] w-full flex items-center gap-3 mb-3">
      <Card
        className="border-1 w-[1000px] space-y-5 p-4"
        shadow="none"
        radius="sm"
        isPressable={viewer}
        onPress={() => goToPost(post.id)}
      >
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar
              showFallback
              name={post.postedBy}
              isBordered
              radius="full"
              size="md"
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">
                {post.postedBy}
              </h4>
              <h5 className="text-small tracking-tight text-default-400">
                posted on {formatDate(String(post.postedAt))}
              </h5>
            </div>
          </div>
          <span className="pt-2">
            {post.tags.map((tag, index) => {
              return (
                <span key={index}>
                  <Chip color="warning" variant="flat">
                    {tag}
                  </Chip>{" "}
                </span>
              );
            })}
          </span>
        </CardHeader>
        <CardBody className="px-3 py-0 text-small text-default-400">
          <h3 className="text-lg font-semibold text-default-900 pb-4">
            {post.title}
          </h3>
          {!viewer && (
            <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
