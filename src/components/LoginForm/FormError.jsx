import { ErrorMessage } from 'formik';
import PropTypes from 'prop-types';


export const FormError = ({ name }) => {
  return (
    <ErrorMessage
      name={name}
      render={message => <p>{message}</p>}
    />
  )
};

FormError.propTypes = {
  name: PropTypes.string.isRequired,
};