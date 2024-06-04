import "@/styles/globals.css";
import "@/styles/globalicons.css";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import ReduxProvider from "@/components/common/redux-provider";
import AuthProvider from "@/components/common/auth-provider";
import HttpClientProvider from "@/components/common/http-client-provider";
import ThemeProvider from "@/components/common/theme-provider";

import clsx from "clsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ReduxProvider>
          <ThemeProvider
            themeProps={{ attribute: "class", defaultTheme: "light" }}
          >
            <HttpClientProvider>
              <AuthProvider>
                <ToastContainer autoClose={5000} />
                {children}
              </AuthProvider>
            </HttpClientProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
