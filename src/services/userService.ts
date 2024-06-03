import { IForm, IResponse } from "@/types";
import httpClient from "@/utils/httpClient";

export const createUser = async (payload: IForm) => {
  const { data } = await httpClient.post<IResponse>("/users", payload);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await httpClient.get<IResponse>("/users/me");
  return data;
};
