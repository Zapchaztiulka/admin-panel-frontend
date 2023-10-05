import PropTypes from "prop-types";

import { ArrowDownIcon, ArrowUpIcon } from "../../utils/icons";

export const ArrowButton = ({ isOpen, buttonStyle }) => {
  return (
    <button
      type="button"
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
};
