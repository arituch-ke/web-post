import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
const CKeditor = dynamic(() => import("@/components/ck-editor"), {
  ssr: false,
});

export default function FormInputRichText({
  name,
  control,
  isRequired = true,
  formState,
}: {
  name: string;
  control: any;
  isRequired?: boolean;
  formState: any;
}) {
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <CKeditor
          name={name}
          onChange={(data: string) => {
            field.onChange(data);
          }}
          errorMessage={formState?.errors[name]?.message}
          isRequired={isRequired}
          editorLoaded={editorLoaded}
          value={field.value}
        />
      )}
    />
  );
}
