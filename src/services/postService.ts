import { IPostModel } from "@/models/post";
import { CommonResponse } from "@/types";

type PayloadPost = Pick<IPostModel, "title" | "content" | "status" | "tags">;

async function getHttpClient() {
  const httpClientModule = await import(
    "@/components/common/http-client-provider"
  );
  return httpClientModule.getHttpClient();
}

export const createPost = async (payload: PayloadPost) => {
  const httpClient = await getHttpClient();
  return httpClient.post<PayloadPost, CommonResponse>("/posts", payload);
};
