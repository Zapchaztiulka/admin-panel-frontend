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
      className={`flex items-center  justify-between  rounded-minimal group ${style}`}
      onClick={toggleModal}
    >
      <>
        {to ? (
          <NavLink
            to={to}
            className={`flex gap-xs3 items-center pt-xs3 pb-xs3 pr-xs2 pl-xs2 w-full
      rounded-minimal hover:bg-bgHoverGrey active:bg-bgPressedGrey ${styleBefore}`}
          >
            {IconComponent}
            {title}
          </NavLink>
        ) : (
          <div
            onClick={changeState}
            className="flex gap-xs3 items-center w-[100%] pt-xs3 pb-xs3 pr-xs2 pl-xs2 cursor-pointer "
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
