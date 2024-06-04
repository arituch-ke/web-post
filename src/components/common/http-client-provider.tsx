"use client";
import React, { createContext, useContext } from "react";
import HttpClient from "@/utils/HttpClient";

// Helper function for non-React usage
export const getHttpClient = () => {
  return HttpClient;
};
const HttpClientContext = createContext(HttpClient);

type Props = {
  children: React.ReactNode;
};

export const HttpClientProvider = ({ children }: Props) => (
  <HttpClientContext.Provider value={HttpClient}>
    {children}
  </HttpClientContext.Provider>
);

export const useHttpClient = () => useContext(HttpClientContext);

export default HttpClientProvider;
