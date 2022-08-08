import { PropsWithChildren } from "react";

export type CenterProps = { className?: string };

export const Center = ({
  children,
  className = "",
}: PropsWithChildren<CenterProps>): JSX.Element => {
  return (
    <div className={"flex justify-center items-center " + className}>
      {children}
    </div>
  );
};
export default Center;
