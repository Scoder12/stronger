import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLoginMutation, useMeQuery } from "src/generated/graphql";
import fieldErrorsToFormik from "../../fieldErrorsToFormik";
import Button from "../Button";
import { FormPage } from "../FormPage";
import Input from "../Input";

export const LoginForm = (): JSX.Element => {
  const { data: meQueryData } = useMeQuery();
  const [login, { data, loading, error }] = useLoginMutation();
  const router = useRouter();

  useEffect(() => {
    if (meQueryData?.me?.username || data?.login.user?.username) {
      router.push("/home");
    }
  }, [meQueryData, data]);

  if (error) return <p>Error: {error.message}</p>;
  const disabled = loading || Boolean(data?.login.user?.username);

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
            <Field
              name="username"
              label="Username"
              component={Input}
              disabled={isSubmitting || disabled}
            />
            <Field
              type="password"
              name="password"
              label="Password"
              component={Input}
              disabled={isSubmitting || disabled}
            />
            <Button
              type="submit"
              className="float-right mt-2"
              disabled={disabled}
              loading={isSubmitting || loading}
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
