import React from "react";

interface IButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  style?: "primary" | "secondary" | "outline" | "positive" | "danger";
  className?: string;
}

const Button = (props: IButtonProps) => {
  return (
    <button
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (props.onClick) props.onClick(e);
      }}
      className={`${
        props.style === "outline"
          ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          : props.style === "secondary"
          ? "bg-gray-900 hover:bg-gray-950 text-white"
          : props.style === "positive"
          ? "bg-blue-500 hover:bg-blue-700 text-white"
          : props.style === "danger"
          ? "bg-red-600 hover:bg-red-800 text-white"
          : "bg-red-500 hover:bg-red-700 text-white"
      } font-bold py-2 px-4 rounded text-xs ${props.className}`}
    >
      {props.children}
    </button>
  );
};

export default Button;
