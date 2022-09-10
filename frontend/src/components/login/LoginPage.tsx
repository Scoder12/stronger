import { ErrorMessage, Field, Form, Formik } from "formik";
import Center from "../Center";

export const LoginPage = (): JSX.Element => {
  return (
    <Center className="h-full">
      <div>
        <h1 className="text-4xl text-bold">Login</h1>
        <Formik
          initialValues={{ username: "" }}
          onSubmit={(values: any, { setErrors }) => {
            console.log(values);
            setErrors({ username: "bad" });
          }}
        >
          {() => (
            <Form>
              <Field type="text" name="username" />
              <ErrorMessage name="username" component="div" />
            </Form>
          )}
        </Formik>
      </div>
    </Center>
  );
};
