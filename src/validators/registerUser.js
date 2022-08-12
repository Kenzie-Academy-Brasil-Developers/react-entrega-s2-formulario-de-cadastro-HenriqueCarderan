import * as yup from "yup";

export const registerSchema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().required("Email required").email("Invalid Email"),
  password: yup
    .string()
    .matches(/[A-Z]/, "must contain one uppercase")
    .matches(/([a-z])/, "must contain one lowercase")
    .matches(/(\d)/, "must contain one number")
    .matches(/(\W)/, "must contain one special character")
    .min(8, "Password must be 8 characters. long")
    .required("Password required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password must match"),
  bio: yup.string().required("Bio required"),
  contact: yup.string().required("Contato required"),
  course_module: yup.string().required("Module required"),
});
