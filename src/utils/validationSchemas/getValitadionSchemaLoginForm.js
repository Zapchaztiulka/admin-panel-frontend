import * as yup from "yup";

export const getValitadionSchemaLoginForm = () => {
  const emailRegExp =
    /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  const emailValidationText =
    'Дійсна адреса електронної пошти складається з 4 частин: імені одержувача (John52), символу @, доменного імені (gmail), домену верхнього рівня (.com). Наприклад: "John52@gmail.com".';
  const passwordRegExp = "^(?=.*[a-z])(?=.*[A-Z]).{6,}$";
  const passwordValidationText =
    "Пароль має містити не менше 6 символів та мати одну літеру у верхньому та нижньому регістрі";
  return yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Email is a required field")
      .matches(emailRegExp, emailValidationText),
    password: yup
      .string()
      .required("Password is a required field")
      .matches(passwordRegExp, passwordValidationText),
  });
};
