import PropTypes from "prop-types";

import { ArrowDownIcon, ArrowUpIcon } from "../../utils/icons";

export const ArrowButton = ({ isOpen, buttonStyle, changeState }) => {
  return (
    <button
      type="button"
      onClick={changeState}
      className={`group-hover:rounded-minimal group-hover:bg-bgHoverGrey group-active:bg-bgPressedGrey group-active:rounded-minimal ${buttonStyle}`}
    >
      {isOpen ? (
        <ArrowDownIcon className="stroke-iconSecondary" />
      ) : (
        <ArrowUpIcon className="stroke-iconSecondary" />
      )}
    </button>
  );
};

ArrowButton.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  buttonStyle: PropTypes.string,
  changeState: PropTypes.func.isRequired
};
