"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import {
  getCurrentUser,
  logout,
  refreshToken,
  userState,
} from "@/store/silces/userSlice";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

type Props = {
  children: React.ReactNode;
};
type DecodedToken = {
  exp: number;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const reducer = useSelector(userState);
  const { isAuthenticated, accessToken } = reducer;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize guards
    const initializeGuards = async () => {
      const isAuthPath = ["/login", "/register"].includes(path);
      const hasAccess = isAuthenticated && accessToken;

      if (hasAccess) {
        const decoded: DecodedToken = jwtDecode(accessToken);
        const expiryTime = dayjs.unix(decoded.exp);
        const currentTime = dayjs();
        const isExpiringSoon = expiryTime.diff(currentTime, "second") < 60;
        const payload = {
          accessToken,
          refreshToken: reducer.refreshToken,
        };

        if (expiryTime.isBefore(currentTime)) {
          await dispatch(logout());
          router.replace("/login");
        } else if (isExpiringSoon) {
          await dispatch(refreshToken(payload));
        }
      }

      if (hasAccess && isAuthPath) {
        await dispatch(getCurrentUser());
        router.replace("/");
      } else if (!hasAccess && !isAuthPath) {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    };

    initializeGuards();
  }, [
    isAuthenticated,
    accessToken,
    path,
    router,
    dispatch,
    reducer.refreshToken,
  ]);

  if (loading) {
    return <></>;
  }

  return children;
}
