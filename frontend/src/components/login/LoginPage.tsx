import { ErrorMessage, Field, Form } from "formik";
import Center from "../Center";

export const LoginPage = (): JSX.Element => {
  return (
    <Center className="h-full">
      <div>
        <h1 className="text-4xl text-bold">Login</h1>
        <Form>
          <Field type="text" name="username" />
          <ErrorMessage name="username" component="div" />
        </Form>
      </div>
    </Center>
  );
};
