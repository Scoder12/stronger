import { Field, FieldProps, Form, Formik, useField } from "formik";
import Button from "../Button";
import Center from "../Center";

const Input = ({
  field,
  form,
  label,
  ...props
}: FieldProps & { label: string }) => {
  const [, { error }] = useField(field);
  console.log({ error });
  return (
    <label className={"" + (error ? "text-red-500" : "")}>
      <div className="pb-1">
        <span className="font-semibold">{label}</span>
        <span className="px-2">-</span>
        <span className="italic">{error}</span>
      </div>
      <input
        className={
          "py-1 block " + (error ? "border border-solid border-red-500" : "")
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
              <Button type="submit" className="float-right">
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Center>
  );
};
