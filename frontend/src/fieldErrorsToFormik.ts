export function fieldErrorsToFormik(
  errors: { field: string; message: string }[]
) {
  return Object.fromEntries(errors.map((e) => [e.field, e.message]));
}

export default fieldErrorsToFormik;
