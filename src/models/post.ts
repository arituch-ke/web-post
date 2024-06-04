import { UUID } from "crypto";

export interface IPostModel {
  id: UUID;
  userId: UUID | null;
  title: string;
  content: string;
  cover: string | null;
  postedBy: string;
  postedAt: Date;
  tags: string[];
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  createdAt: Date;
  updatedAt: Date;
}
