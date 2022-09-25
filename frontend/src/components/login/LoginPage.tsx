import { Field, Form, Formik } from "formik";
import { useLoginMutation } from "src/generated/graphql";
import fieldErrorsToFormik from "../../fieldErrorsToFormik";
import Button from "../Button";
import { FormPage } from "../FormPage";
import Input from "../Input";

export const LoginForm = (): JSX.Element => {
  const [login, { data, loading, error }] = useLoginMutation();

  if (data && data.login.user) return <p>{"hi " + data.login.user}</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (
          values: { username: string; password: string },
          { setErrors }
        ) => {
          const res = await login({ variables: values });
          const fieldErrors = res.data?.login.errors;
          if (fieldErrors) {
            setErrors(fieldErrorsToFormik(fieldErrors));
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
    <FormPage name="Login">
      <LoginForm />
    </FormPage>
  );
};
