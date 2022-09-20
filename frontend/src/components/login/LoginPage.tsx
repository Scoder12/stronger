import { FetchResult } from "@apollo/client";
import { Field, FieldProps, Form, Formik, useField } from "formik";
import {
  LoginMutation,
  LoginMutationVariables,
  useLoginMutation,
} from "src/generated/graphql";
import Button from "../Button";
import Center from "../Center";

const Input = ({
  field,
  form,
  label,
  ...props
}: any & FieldProps & { label: string }) => {
  const [, { error }] = useField(field);

  return (
    <label className={"" + (error ? "text-red-500" : "")}>
      <span className="font-semibold">{label}</span>
      {error ? (
        <>
          <span className="px-2">-</span>
          <span className="italic">{error}</span>
        </>
      ) : null}
      <input
        className={
          "py-1 w-full rounded-md block border border-solid " +
          (error ? "border-red-500" : "border-transparent")
        }
        {...field}
        {...props}
      />
    </label>
  );
};

export interface LoginFormProps {
  login: (
    vars: LoginMutationVariables
  ) => Promise<
    FetchResult<LoginMutation, Record<string, any>, Record<string, any>>
  >;
}

function fieldErrorsToFormik(errors: { field: string; message: string }[]) {
  return Object.fromEntries(errors.map((e) => [e.field, e.message]));
}

export const LoginForm = ({ login }: LoginFormProps): JSX.Element => {
  return (
    <Center className="h-full">
      <div className="w-full max-w-sm px-3">
        <h1 className="text-4xl text-bold">Login</h1>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (
            values: { username: string; password: string },
            { setErrors }
          ) => {
            console.log(values);
            const res = await login(values);
            const fieldErrors = res.data?.login.errors;
            console.log({ fieldErrors });
            if (fieldErrors) {
              const e = fieldErrorsToFormik(fieldErrors);
              console.log({ e });
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
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Center>
  );
};

export const LoginPage = (): JSX.Element => {
  const [login, { data, loading, error }] = useLoginMutation();

  if (data && data.login.user) return <p>{"hi " + data.login.user}</p>;
  if (error) return <p>oopsies . </p>;

  return <LoginForm login={(variables) => login({ variables })} />;
};
