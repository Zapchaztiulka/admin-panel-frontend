import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';


export const FormError = ({ name }) => {
  return (
    <ErrorMessage
    
      name={name}
      render={message => <p className='mt-[4px] leading-[1.4] text-textError '>{message}</p>}
    />
  )
};

FormError.propTypes = {
  name: PropTypes.string.isRequired,
};