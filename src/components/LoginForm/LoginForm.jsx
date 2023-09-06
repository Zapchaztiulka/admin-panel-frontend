import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { getValitadionSchemaLoginForm } from "../../utils/validationSchemas/getValitadionSchemaLoginForm";
import { logIn } from "../../redux/auth/operations";
import { LoginInput } from "./LoginInput";
import { useState } from "react";
// import { EyeIcon, EyeOffIcon } from "../../utils/icons";
// import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const initialValues = {
  email: "",
  password: "",
};
export const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(true);
   const toogleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={getValitadionSchemaLoginForm}
      >
        {formik => {
          return (
            <Form>
              <div>
                <div className="flex flex-col gap-[12px]">
                  <LoginInput name="email" type="email" text="Логін" placeholder='your@email.com' valid={formik.errors.email && formik.touched.email} />          
                <div className=" mb-[32px]">
                    <LoginInput name="password" type={showPassword ? "password" : 'text'} text="Пароль" placeholder='**********' valid={formik.errors.password && formik.touched.password} toogleShowPassword={toogleShowPassword} showPassword={showPassword} value={formik.values.password} />          
           
                  </div>
                  </div>
          
                <button type="submit" disabled={!(formik.dirty && formik.isValid)} className="flex justify-center items-center pt-[12px] pb-[12px] w-[100%] rounded-[8px] 
          bg-bgMainBtD text-[16px] text-textContrast font-[500] leading-[1.4] tracking-[-0.24px]
          disabled:bg-bgDisable disabled:text-textDisabled
          hover:bg-bgMainBtHover focus-visible:shadow-btFocus  outline-0 active:bg-bgMainBtPressed active:shadow-none">Увійти</button>
        </div>
            </Form>
          )
        }}
       
      </Formik>
    </div>
  );
};


 