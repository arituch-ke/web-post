import { UUID } from "crypto";

export interface IUserModel {
  id: UUID;
  name: string;
  username: string | null;
  email: string;
  status: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
