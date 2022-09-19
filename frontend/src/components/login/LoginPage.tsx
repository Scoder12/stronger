import { Field, FieldProps, Form, Formik, useField } from "formik";
import Button from "../Button";
import Center from "../Center";

const Input = ({
  field,
  form,
  label,
  ...props
}: any & FieldProps & { label: string }) => {
  const [, { error }] = useField(field);
  console.log({ error });
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
          "py-1 block border border-solid " +
          (error ? "border-red-500" : "border-transparent")
        }
        {...field}
        {...props}
      />
    </label>
  );
};

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
              <Field name="username" label="Username" component={Input} />
              <Field name="password" label="Password" component={Input} type="password" />
              <Button type="submit" className="float-right mt-2">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Center>
  );
};
