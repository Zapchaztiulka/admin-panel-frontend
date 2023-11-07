import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import "./styles.css";

export const SecondaryGreyBtn = ({ children, to, disabled, onClick }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }
    navigate(to);
  };

  return !disabled ? (
    <button className="second-grey" onClick={handleButtonClick}>
      {children}
    </button>
  ) : (
    <button className="second-grey-disabled">{children}</button>
  );
};

SecondaryGreyBtn.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string,
  disabled: PropTypes.bool,
  pressed: PropTypes.bool,
  onClick: PropTypes.func,
};
