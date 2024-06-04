import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
  AxiosHeaders,
} from "axios";
import axios from "axios";
import CustomError from "@/errors/CustomError";
import { store, RootState } from "@/store";

/**
 * HttpClient
 */
class HttpClient {
  private readonly headers: RawAxiosRequestHeaders | AxiosHeaders;
  private readonly baseURL: string;
  private instance: AxiosInstance | null = null;

  /**
   * Http instance
   * @return {AxiosInstance} The http instance
   */
  private get http(): AxiosInstance {
    return this.instance !== null ? this.instance : this.initHttp();
  }

  /**
   * Constructor
   * @param {AxiosInstance} axios The axios instance
   * @param {string} version The version of api
   */
  constructor({ baseURL, headers }: AxiosRequestConfig) {
    this.baseURL = String(baseURL);
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json; charset=utf-8",
      ...headers,
    };
  }

  /**
   * Initialize the http instance of axios
   * @return {AxiosInstance} The http instance
   */
  private initHttp(): AxiosInstance {
    const http = axios.create({ baseURL: this.baseURL, headers: this.headers });

    this.instance = this.setupInterceptors(http);

    return http;
  }

  /**
   * Handle response
   * @param {AxiosResponse} response response from call api then request
   * @return {AxiosResponse} The response from request
   */
  private onResponse(response: AxiosResponse): AxiosResponse {
    const data = response.data;
    const { status, result } = data;

    if (status === "ERROR") {
      throw CustomError.fromJSON(result);
    }

    return result;
  }

  /**
   * Inject JWT token
   * @param {AxiosRequestConfig} config The request config before to request
   * @return {InternalAxiosRequestConfig} The request config
   */
  private async onRequest(
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> {
    const state = store.getState() as RootState;
    const { isAuthenticated, accessToken } = state.userReducer;

    if (isAuthenticated && accessToken && !config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  }

  /**
   * Handle error response
   * @return {void} Nothing
   */
  private onErrorResponse(): void {
    throw new Error("Oops! Something went wrong.");
  }

  /**
   * Setup Interceptors of request and response
   * @param {AxiosInstance} http the instance for setup Intercept
   * @return {AxiosInstance} The http instance
   */
  private setupInterceptors(http: AxiosInstance): AxiosInstance {
    http.interceptors.request.use(
      this.onRequest.bind(this),
      this.onErrorResponse
    );
    http.interceptors.response.use(this.onResponse, this.onErrorResponse);

    return http;
  }

  /**
   * Http Get method
   * @param {string} url path url to request
   * @param {AxiosRequestConfig | string} config The request config before to request get
   * @return {Promise<R>} The response from request
   */
  public get<T = never, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.get<T, R>(url, config);
  }

  /**
   * Http Post method
   * @param {string} url path url to request
   * @param {T} data data for attached with request
   * @param {AxiosRequestConfig} config The request config before to request post
   * @return {Promise<R>} The response from request
   */
  public post<T = never, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.post<T, R>(url, data, config);
  }

  /**
   * Http Put method
   * @param {string} url path url to request
   * @param {T} data data for attached with request
   * @param {AxiosRequestConfig} config The request config before to request put
   * @return {Promise<R>} The response from request
   */
  public put<T = never, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.put<T, R>(url, data, config);
  }

  /**
   * Http Patch method
   * @param {string} url path url to request
   * @param {T} data data for attached with request
   * @param {AxiosRequestConfig} config The request config before to request patch
   * @return {Promise<R>} The response from request
   */
  public patch<T = never, R = AxiosResponse<T>>(
    url: string,
    data?: T,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.patch<T, R>(url, data, config);
  }

  /**
   * Http Delete method
   * @param {string} url path url to request
   * @param {AxiosRequestConfig} config The request config before to request delete
   * @return {Promise<R>} The response from request
   */
  public delete<T = never, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    return this.http.delete<T, R>(url, config);
  }
}

const httpClient = new HttpClient({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
});

export default httpClient;
