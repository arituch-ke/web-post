import { UUID } from "crypto";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IResponse {
  status: "SUCCESS" | "ERROR";
  result:
    | Record<string, any>
    | {
        code: null | string;
        type: string;
        message: string;
      };
}

export type CommonResponse = { [key: string]: UUID | string; message: string };

export interface IForm {
  name: string;
  email: string;
  password: string;
}

export interface IPropFormInput {
  name: string;
  control: any;
  label: string;
  setValue?: any;
  type: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  formState: any;
  isRequired?: boolean;
}
