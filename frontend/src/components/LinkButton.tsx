import Link from "next/link";
import { PropsWithChildren } from "react";

export type LinkButtonProps = { href: string; primary?: boolean };

export const LinkButton = ({
  children,
  href,
  primary = true,
}: PropsWithChildren<LinkButtonProps>): JSX.Element => {
  return (
    <Link
      href={href}
      className={
        "mx-2 rounded-md px-6 py-2.5 " +
        (primary ? "bg-blue-500" : "outline outline-1 outline-blue-500")
      }
    >
      {children}
    </Link>
  );
};

export default LinkButton;
