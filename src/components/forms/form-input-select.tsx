import React from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { IPropFormInput } from "@/types";
import { Controller } from "react-hook-form";

type Props = Omit<IPropFormInput, "type"> & { items: any[] };

export default function FormInputSelect({
  name,
  control,
  label,
  className,
  size = "sm",
  formState,
  items,
  isRequired = true,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          label={label}
          size={size}
          variant="bordered"
          {...field}
          isInvalid={!!formState?.errors[name]}
          errorMessage={formState?.errors[name]?.message}
          className={className}
        >
          {items.map((item: any) => (
            <SelectItem key={item.key}>{item.label}</SelectItem>
          ))}
        </Select>
      )}
    />
  );
}
