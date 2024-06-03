"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/store";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, userState } from "@/store/silces/userSlice";
import { useSelector } from "react-redux";

type Props = {
  children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const path = usePathname();
  const dispatch = useAppDispatch();
  const { isAuthenticated, accessToken } = useSelector(userState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize guards
    const initializeGuards = async () => {
      const isAuthPath = ["/login", "/register"].includes(path);
      const hasAccess = isAuthenticated && accessToken;

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
  }, [isAuthenticated, accessToken, path, router, dispatch]);

  if (loading) {
    return null;
  }

  return children;
}
