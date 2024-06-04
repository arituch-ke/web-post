import { IForm } from "@/types";
import { IAuthModel } from "@/models/auth";

// Dynamically import getHttpClient only when needed
async function getHttpClient() {
  const httpClientModule = await import(
    "@/components/common/http-client-provider"
  );
  return httpClientModule.getHttpClient();
}

export const login = async (payload: Omit<IForm, "name">) => {
  const httpClient = await getHttpClient();
  return httpClient.post<Omit<IForm, "name">, IAuthModel>(
    "/auth/login",
    payload
  );
};

export const refreshToken = async (payload: IAuthModel) => {
  const httpClient = await getHttpClient();
  return httpClient.post<IAuthModel, IAuthModel>("/auth/refresh", payload);
};
