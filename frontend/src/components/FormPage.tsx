import { PropsWithChildren } from "react";
import Center from "./Center";

export interface FormPageProps {
  name: string;
}

export const FormPage = ({
  name,
  children,
}: PropsWithChildren<FormPageProps>): JSX.Element => {
  return (
    <Center className="h-full">
      <div className="w-full max-w-sm px-3">
        <h1 className="text-4xl text-bold">{name}</h1>
        {children}
      </div>
    </Center>
  );
};
