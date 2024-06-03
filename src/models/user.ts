import { UUID } from "crypto";

export interface IUser {
  id: UUID;
  name: string;
  username: string | null;
  email: string;
  status: string;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
