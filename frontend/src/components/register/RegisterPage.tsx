import { Field, Form, Formik } from "formik";
import { useRegisterMutation } from "src/generated/graphql";
import fieldErrorsToFormik from "../../fieldErrorsToFormik";
import Button from "../Button";
import { FormPage } from "../FormPage";
import Input from "../Input";

// The code here could be shared wiht LoginPage, but that would be annoying!

export const RegisterForm = (): JSX.Element => {
  const [register, { data, loading, error }] = useRegisterMutation();

  if (data && data.register.user) return <p>{"hi " + data.register.user}</p>;
  if (error) return <p>Error: {error.message}</p>;

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
