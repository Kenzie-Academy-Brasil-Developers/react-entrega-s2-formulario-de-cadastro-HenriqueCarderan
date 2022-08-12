import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email required").email("Invalid Email"),
  password: yup.string().required("Password required"),
});
