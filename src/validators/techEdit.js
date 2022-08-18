import * as yup from "yup";

export const techEditSchema = yup.object().shape({
  status: yup.string().required("Digite o status"),
});
