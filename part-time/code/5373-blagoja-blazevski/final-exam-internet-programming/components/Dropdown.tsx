import { IData } from "@/utils/CommonInterfaces";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { IDropDownProps } from "./EditProps";

const Dropdown = forwardRef<HTMLSelectElement, IDropDownProps>((props, ref) => {
  const ddInstance = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ddInstance.current!);

  const renderOptions = () => {
    return props.options!.map((option: IData | string, index: number) => (
      <option
        key={`option_${index}`}
        value={
          typeof option === "object"
            ? option[props.optionValue ? props.optionValue : ""]
            : option
        }
      >
        {typeof option === "object"
          ? option[props.optionLabel ? props.optionLabel : ""]
          : option}
      </option>
    ));
  };

  return (
    <div className="mb-4 sm:px-4 px-2">
      {props.caption && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={props.name}
        >
          {props.caption}
        </label>
      )}
      <select
        ref={ddInstance}
        value={props.value}
        id={props.name}
        name={props.name}
        defaultValue={""}
        className={`${props.className} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          if (props.onChange) props.onChange(e);
        }}
      >
        <option disabled value={""}>
          Select an option
        </option>
        {props.options && renderOptions()}
      </select>
    </div>
  );
});

export default Dropdown;
