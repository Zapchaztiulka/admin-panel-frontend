import PropTypes from "prop-types";

import { ArrowButton } from "../Buttons/ArrowButton";

export const ItemNavigationWithoutLink = ({
  component: Component,
  title,
  changeState,
    isOpen,
  
}) => {
  return (
    <li onClick={changeState} className="flex items-center justify-between pt-[4px] pb-[4px]">
      <div className="flex gap-[4px] items-center">
        {Component} <span>{title}</span>
      </div>
       <ArrowButton changeState={changeState} isOpen={isOpen} />
    </li>
  );
};

ItemNavigationWithoutLink.propTypes = {
  component: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  changeState: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  
};
