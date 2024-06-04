"use client";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import FormInputText from "@/components/forms/form-input-text";
import handleToast from "@/utils/handleToast";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@nextui-org/react";
import FormInputRichText from "@/components/forms/form-input-rich-text";
import { ITEMS } from "@/utils/constant";
import FormInputSelect from "@/components/forms/form-input-select";
import { createPost } from "@/services/postService";
import CustomError from "@/errors/CustomError";
import DOMPurify from "dompurify";

interface IFormInput {
  title: string;
  content: string;
  status: string;
  tags: string;
}

const postSchema = yup.object({
  title: yup.string().required(),
  content: yup.string().required(),
  status: yup.string().required(),
  tags: yup
    .string()
    .matches(
      /^\s*[a-zA-Z0-9]+\s*(,\s*[a-zA-Z0-9]+\s*)*$/,
      "Tags must be comma-separated values."
    )
    .required(),
});

type FormData = yup.InferType<typeof postSchema>;

export default function NewPost() {
  const items = ITEMS;
  const { handleSubmit, control, formState } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      status: "",
      tags: "",
    },
    resolver: yupResolver(postSchema),
  });

  const onSubmit = async (data: IFormInput) => {
    const tags = data.tags.split(",").map((tag) => tag.trim());
    const sanitizedContent = DOMPurify.sanitize(data.content);
    const payload = {
      title: data.title,
      content: sanitizedContent,
      status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
      tags,
    };

    try {
      const result = await createPost(payload);
      handleToast(result.message, "success");
    } catch (error) {
      if (error instanceof CustomError) handleToast(error.message, "error");
    }
  };

  return (
    <div className="flex flex-col pt-5 items-center justify-center ">
      <h1 className="mb-4 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white flex justify-center">
        Write Post
      </h1>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInputText
          name="title"
          label="Title"
          type="text"
          control={control}
          formState={formState}
        />

        <FormInputSelect
          name="status"
          items={items}
          label="Status"
          control={control}
          formState={formState}
        />

        <FormInputText
          name="tags"
          label="Tags"
          type="text"
          control={control}
          formState={formState}
        />

        <FormInputRichText
          name="content"
          control={control}
          formState={formState}
        />

        <Button
          type="submit"
          isLoading={formState.isSubmitting}
          className="w-full"
          color="primary"
          variant="solid"
        >
          Create Post
        </Button>
      </form>
    </div>
  );
}
