import PropTypes from 'prop-types';
import { Field } from "formik"
import { FormError } from "./FormError"
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';


export const LoginInput = ({ name, type, text, placeholder, valid, toogleShowPassword, showPassword, value }) => {
    return (
        
         <label className='relative'>
                <span className="mb-[4px] text-textSecondary leading-[1.4]">{text}</span>
                <Field name={name} type={type} placeholder={placeholder}
                className={` w-[100%] p-[12px] border-[1px] border-borderD ${valid ? 'border-textError' : 'focus:border-borderA'} 
                    rounded-[4px] bg-transparent hover:bg-bgInputHover text-[16px] text-textInputD focus:text-textInputA hover:text-textInputA outline-0
                     placeholder:text-textInputD  `} />
            <FormError name={name} />
            {type !== 'email' && ( <button type='button' onClick={toogleShowPassword} className="absolute top-[40px] right-[12px]">
                      {showPassword ? <AiOutlineEyeInvisible title='Показати пароль' className={`w-[16px] h-[16px] ${value ? "fill-iconPrimary" : "fill-iconSecondary" } `}/> : <AiOutlineEye title='Сховати пароль'className={`w-[16px] h-[16px] ${value ? "fill-iconPrimary" : "fill-iconSecondary" } `} />}
</button>)}
          </label>
       
    )
}
LoginInput.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    valid: PropTypes.bool,
    showPassword: PropTypes.bool,
    toogleShowPassword: PropTypes.func,
    value: PropTypes.string,

};