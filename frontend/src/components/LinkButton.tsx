import Link from "next/link";
import { PropsWithChildren } from "react";

export type LinkButtonProps = {
  className?: string;
  href: string;
  primary?: boolean;
};

export const LinkButton = ({
  children,
  className = "",
  href,
  primary = true,
}: PropsWithChildren<LinkButtonProps>): JSX.Element => {
  return (
    <Link href={href}>
      <a
        className={
          "text-center text-lg rounded-md px-6 py-2.5 " +
          (primary ? "bg-blue-500" : "outline outline-1 outline-blue-500") +
          " " +
          className
        }
      >
        {children}
      </a>
    </Link>
  );
};

export default LinkButton;
