import React, { useEffect, useState } from "react";
import { IInputProps } from "./EditProps";

const TextArea = (props: IInputProps) => {
  const [value, setValue] = useState<string>(props.value ?? "");

  useEffect(() => {
    if (props.value !== undefined && props.value !== value) {
      setValue(props.value);
    }
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
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
      <textarea
        name={props.name}
        value={value}
        rows={5}
        onChange={handleChange}
        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          props.invalid ? "border-red-500" : ""
        }`}
      />
      {props.invalid && (
        <p className="text-red-500 text-xs italic">{props.invalidMessage}</p>
      )}
    </div>
  );
};

export default TextArea;
