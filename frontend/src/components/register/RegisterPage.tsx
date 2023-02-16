import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery, useRegisterMutation } from "src/generated/graphql";
import fieldErrorsToFormik from "../../fieldErrorsToFormik";
import Button from "../Button";
import { FormPage } from "../FormPage";
import Input from "../Input";

// The code here could be shared wiht LoginPage, but that would be annoying!

export const RegisterForm = (): JSX.Element => {
  const { data: meQueryData } = useMeQuery();
  const [register, { data, loading, error }] = useRegisterMutation();
  const router = useRouter();

  useEffect(() => {
    if (meQueryData?.me?.username || data?.register.user?.username) {
      router.push("/home");
    }
  }, [meQueryData, data]);

  if (error) return <p>Error: {error.message}</p>;
  const disabled = loading || Boolean(data?.register.user?.username);

  return (
    <>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (
          values: { username: string; password: string },
          { setErrors }
        ) => {
          const res = await register({ variables: values });
          const fieldErrors = res.data?.register.errors;
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
              disabled={isSubmitting || disabled}
              loading={loading}
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export const RegisterPage = (): JSX.Element => {
  return (
    <FormPage name="Register">
      <RegisterForm />
    </FormPage>
  );
};
