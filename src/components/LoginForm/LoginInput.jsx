import PropTypes from "prop-types";
import { Field } from "formik";
import { FormError } from "./FormError";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

export const LoginInput = ({
  name,
  type,
  text,
  valid,
  toogleShowPassword,
  showPassword,
  value,
}) => {
  return (
    <label className="relative">
      <span className="mb-[4px] text-textSecondary leading-[1.4]">{text}</span>
      <Field
        name={name}
        type={type}
              className={` w-[100%] p-[12px] border-[1px] border-borderD rounded-[4px] text-[16px] text-textInputD  outline-0
         focus:text-textInputA focus:bg-bgD  hover:bg-bgInputHover  hover:text-textInputA autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)] autofill:hover:shadow-[inset_0_0_0px_1000px_rgb(239,248,255)] ${
          valid ? "border-textError" : "focus:border-borderA"
        } `}
          />
      <FormError name={name} />
      {type !== "email" && (
        <button
          type="button"
          onClick={toogleShowPassword}
          className="absolute top-[36px] right-[12px]"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible
              title="Показати пароль"
              className={`w-[16px] h-[16px] ${
                value ? "fill-iconPrimary" : "fill-iconSecondary"
              } `}
            />
          ) : (
            <AiOutlineEye
              title="Сховати пароль"
              className={`w-[16px] h-[16px] ${
                value ? "fill-iconPrimary" : "fill-iconSecondary"
              } `}
            />
          )}
        </button>
      )}
    </label>
  );
};
LoginInput.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  valid: PropTypes.bool,
  showPassword: PropTypes.bool,
  toogleShowPassword: PropTypes.func,
  value: PropTypes.string,
};
