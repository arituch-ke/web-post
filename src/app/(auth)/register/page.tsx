"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormInputSecret from "@/components/forms/form-input-secret";
import FormInputText from "@/components/forms/form-input-text";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import handleToast from "@/utils/handleToast";
import { useAppDispatch } from "@/store";
import { register, userState } from "@/store/silces/userSlice";
import { useSelector } from "react-redux";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const registerSchema = yup.object({
  name: yup.string().min(3).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});

type FormData = yup.InferType<typeof registerSchema>;

export default function Register() {
  const { handleSubmit, control, formState } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(registerSchema),
  });
  const reducer = useSelector(userState);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: IFormInput) => {
    const payload: Omit<IFormInput, "confirmPassword"> = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const result = await dispatch(register(payload));
    if (register.fulfilled.match(result))
      handleToast(result.payload.message, "success");
    else if (register.rejected.match(result))
      handleToast(result.error.message, "error");
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center">
        Register here
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInputText
          name="name"
          label="Name"
          type="text"
          control={control}
          formState={formState}
        />
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
        <FormInputSecret
          name="confirmPassword"
          label="Confirm Password"
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
          Register
        </Button>

        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          <Link
            href="/login"
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            Go to Login
          </Link>
        </p>
      </form>
    </div>
  );
}
