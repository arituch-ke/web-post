import { IForm, CommonResponse } from "@/types";
import { IUserModel } from "@/models/user";

// Dynamically import getHttpClient only when needed
async function getHttpClient() {
  const httpClientModule = await import(
    "@/components/common/http-client-provider"
  );
  return httpClientModule.getHttpClient();
}

export const createUser = async (payload: IForm) => {
  const httpClient = await getHttpClient();
  return httpClient.post<IForm, CommonResponse>("/users", payload);
};

export const getCurrentUser = async () => {
  const httpClient = await getHttpClient();
  return httpClient.get<never, { user: IUserModel }>("/users/me");
};
