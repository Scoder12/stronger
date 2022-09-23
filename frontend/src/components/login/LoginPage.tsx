import { Field, Form, Formik } from "formik";
import { useLoginMutation } from "src/generated/graphql";
import Button from "../Button";
import Center from "../Center";
import Input from "../Input";

function fieldErrorsToFormik(errors: { field: string; message: string }[]) {
  return Object.fromEntries(errors.map((e) => [e.field, e.message]));
}

export const LoginForm = (): JSX.Element => {
  const [login, { data, loading, error }] = useLoginMutation();

  if (data && data.login.user) return <p>{"hi " + data.login.user}</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="text-4xl text-bold">Login</h1>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (
          values: { username: string; password: string },
          { setErrors }
        ) => {
          const res = await login({ variables: values });
          const fieldErrors = res.data?.login.errors;
          if (fieldErrors) {
            const e = fieldErrorsToFormik(fieldErrors);
            setErrors(e);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field name="username" label="Username" component={Input} />
            <Field
              name="password"
              label="Password"
              component={Input}
              type="password"
            />
            <Button
              type="submit"
              className="float-right mt-2"
              disabled={isSubmitting}
              loading={loading}
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const LoginPage = (): JSX.Element => {
  return (
    <Center className="h-full">
      <div className="w-full max-w-sm px-3">
        <LoginForm />
      </div>
    </Center>
  );
};
