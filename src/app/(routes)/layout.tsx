import React from "react";
import { Navbar } from "@/components/navbar";
import { ToastContainer } from "react-toastify";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="relative flex flex-col h-screen">
      <ToastContainer autoClose={5000} />
      <Navbar />
      <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
        {children}
      </main>
    </div>
  );
}
