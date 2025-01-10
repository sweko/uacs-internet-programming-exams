import { IData } from "@/utils/CommonInterfaces";
import { HTMLInputTypeAttribute } from "react";

export interface IInputProps {
  type?: HTMLInputTypeAttribute;
  invalid?: boolean;
  invalidMessage?: string;
  name: string;
  caption?: string;
  value?: any;
  onChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  className?: string;
}

export interface IDropDownProps {
  name: string;
  caption?: string;
  options?: IData[] | string[];
  optionLabel?: string;
  optionValue?: string;
  value?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
