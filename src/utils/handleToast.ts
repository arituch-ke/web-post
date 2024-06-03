import { IResponse } from "@/types";
import { toast } from "react-toastify";

export default function handleToast(
  { status, result: { message } }: IResponse,
  customMessage?: string
) {
  if (status === "ERROR") {
    return toast.error(message);
  }

  return toast.success(message ?? customMessage);
}
