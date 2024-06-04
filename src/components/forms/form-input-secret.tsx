import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { IPropFormInput } from "@/types";
import { Controller } from "react-hook-form";
import IconWrapper from "../icon-wrapper";

export default function FormInputSecret({
  name,
  control,
  label,
  className,
  size = "sm",
  formState,
  isRequired = true,
}: Omit<IPropFormInput, "type">) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          type={isVisible ? "text" : "password"}
          label={label}
          variant="bordered"
          isRequired={isRequired}
          isInvalid={!!formState?.errors[name]}
          size={size}
          {...field}
          errorMessage={formState.errors[name]?.message}
          className={className}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IconWrapper>visibility_off</IconWrapper>
              ) : (
                <IconWrapper>visibility</IconWrapper>
              )}
            </button>
          }
        />
      )}
    />
  );
}
