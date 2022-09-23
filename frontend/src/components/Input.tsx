import { FieldProps, useField } from "formik";

export const Input = ({
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
          "p-1 w-full rounded-md block border border-solid " +
          (error ? "border-red-500" : "border-transparent")
        }
        {...field}
        {...props}
      />
    </label>
  );
};

export default Input;
