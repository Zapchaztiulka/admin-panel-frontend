import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useToggleModal } from "../../hooks/useToggleModal";

export const ItemNavigation = ({
  iconComponent: IconComponent,
  title,
  to,
  style,
  styleBefore,
  arrowButton: ArrowButton,
  changeState,
}) => {
  const { toggle } = useToggleModal();
  const toggleModal = () => {
    if (document.documentElement.clientWidth < 1024 && to) {
      toggle();
    }
    return;
  };
  return (
    <div
      className={`flex items-center  justify-between  rounded-[4px] group ${style}`}
      onClick={toggleModal}
    >
      <>
        {to ? (
          <NavLink
            to={to}
            className={`flex gap-[4px] items-center pt-[4px] pb-[4px] pr-[8px] pl-[8px] w-[100%]
      rounded-[4px] hover:bg-bgHoverGrey active:bg-bgPressedGrey ${styleBefore}`}
          >
            {IconComponent}
            {title}
          </NavLink>
        ) : (
          <div
            onClick={changeState}
            className="flex gap-[4px] items-center w-[100%] pt-[4px] pb-[4px] pr-[8px] pl-[8px] cursor-pointer "
          >
            {IconComponent} {title}
          </div>
        )}
        {ArrowButton}
      </>
    </div>
  );
};

ItemNavigation.propTypes = {
  iconComponent: PropTypes.node,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  style: PropTypes.string,
  styleBefore: PropTypes.string,
  changeState: PropTypes.func,
  arrowButton: PropTypes.node,
};
