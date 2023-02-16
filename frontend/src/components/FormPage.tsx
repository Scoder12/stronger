import { PropsWithChildren } from "react";
import Layout from "./Layout";

export interface FormPageProps {
  name: string;
}

export const FormPage = ({
  name,
  children,
}: PropsWithChildren<FormPageProps>): JSX.Element => {
  return (
    <Layout>
      <h1 className="text-4xl text-bold">{name}</h1>
      {children}
    </Layout>
  );
};
