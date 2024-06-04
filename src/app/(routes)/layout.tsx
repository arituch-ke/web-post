"use client";
import React from "react";
import { Navbar } from "@/components/navbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container overflow-y-auto mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
