import { ButtonHTMLAttributes, PropsWithChildren } from "react";

export type ButtonProps = {
  className?: string;
  primary?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  className = "",
  primary = true,
  ...rest
}: PropsWithChildren<ButtonProps>): JSX.Element => {
  return (
    <button
      className={
        "text-center text-md rounded-md px-4 py-2 " +
        (primary ? "bg-blue-500" : "outline outline-1 outline-blue-500") +
        " " +
        className
      }
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
