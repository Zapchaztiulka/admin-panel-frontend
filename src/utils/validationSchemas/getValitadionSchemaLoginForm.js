import * as yup from "yup";

export const getValitadionSchemaLoginForm = () => {
  const emailRegExp =
    /^([a-zA-Z0-9_-]+\.)*[a-zA-Z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
  const emailValidationText = "Не дійсна електронна пошта";
  const passwordRegExp = "^(?=.*[a-z])(?=.*[A-Z]).{6,}$";
  const passwordValidationText =
    "Пароль повинен складатися з шести або більше символів латинського алфавіту, містити великі та малі літери, цифри";
  return yup.object().shape({
    email: yup
      .string()
      .trim()
      .required("Це поле обов'язкове для заповнення")
      .matches(emailRegExp, emailValidationText),
    password: yup
      .string()
      .required("Це поле обов'язкове для заповнення")
      .matches(passwordRegExp, passwordValidationText),
  });
};
