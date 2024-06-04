import React from "react";
import { Input } from "@nextui-org/react";
import { IPropFormInput } from "@/types";
import { Controller } from "react-hook-form";

export default function FormInputText({
  name,
  control,
  label,
  type,
  className,
  size = "sm",
  formState,
  isRequired = true,
}: IPropFormInput) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          type={type}
          label={label}
          isRequired={isRequired}
          size={size}
          variant="bordered"
          {...field}
          isInvalid={!!formState?.errors[name]}
          errorMessage={formState?.errors[name]?.message}
          className={className}
        />
      )}
    />
  );
}
