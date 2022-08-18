import * as yup from "yup";

export const techSchema = yup.object().shape({
  title: yup.string().required("Digite a tecnologia"),
  status: yup.string().required("Digite o status"),
});
