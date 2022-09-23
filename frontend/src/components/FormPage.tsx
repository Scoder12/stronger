import { PropsWithChildren } from "react";
import Center from "./Center";

export const FormPage = ({ children }: PropsWithChildren<{}>): JSX.Element => {
  return (
    <Center className="h-full">
      <div className="w-full max-w-sm px-3">{children}</div>
    </Center>
  );
};
