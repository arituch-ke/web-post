import { IForm, IResponse } from "@/types";
import httpClient from "@/utils/httpClient";

export const login = async (payload: Omit<IForm, "name">) => {
  const { data } = await httpClient.post<IResponse>("/auth/login", payload);

  return data;
};
