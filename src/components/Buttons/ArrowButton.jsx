import PropTypes from "prop-types";

import { ArrowDownIcon, ArrowUpIcon } from "../../utils/icons"

export const ArrowButton = ({ isOpen}) => {

    return (
        <button type="button" >
              {isOpen ? (
                <ArrowDownIcon className="stroke-iconPrimary" />
              ) : (
                <ArrowUpIcon className="stroke-iconPrimary" />
              )}
            </button>
    )
}

ArrowButton.propTypes = {
    isOpen: PropTypes.bool.isRequired,
};
