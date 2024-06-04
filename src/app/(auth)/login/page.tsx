"use client";
import FormInputSecret from "@/components/forms/form-input-secret";
import FormInputText from "@/components/forms/form-input-text";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAppDispatch } from "@/store";
import { login, userState } from "@/store/silces/userSlice";
import handleToast from "@/utils/handleToast";
import { useSelector } from "react-redux";

interface IFormInput {
  email: string;
  password: string;
}

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

type FormData = yup.InferType<typeof loginSchema>;

type Props = {};

export default function Login({}: Props) {
  const { handleSubmit, control, formState } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const reducer = useSelector(userState);
  const dispatch = useAppDispatch();

  const onSubmit = async (payload: IFormInput) => {
    const result = await dispatch(login(payload));
    if (login.fulfilled.match(result))
      handleToast("Login Successfully", "success");
    else if (login.rejected.match(result))
      handleToast(result.error.message, "error");
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center">
        Login here
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInputText
          name="email"
          label="Email"
          type="email"
          control={control}
          formState={formState}
        />
        <FormInputSecret
          name="password"
          label="Password"
          control={control}
          formState={formState}
        />

        <Button
          type="submit"
          isLoading={reducer.status === "fetching"}
          className="w-full"
          color="primary"
          variant="solid"
        >
          Login
        </Button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <Link
            href="/register"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
