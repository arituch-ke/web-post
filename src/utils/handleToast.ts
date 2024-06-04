import { toast } from "react-toastify";

type TypeToast = "success" | "error" | "warning" | "info";
export default function handleToast(
  message: string | undefined,
  typeToast: TypeToast
) {
  return toast[typeToast](message);
}
