import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { useToggleModal } from "../../hooks/useToggleModal";


export const ItemNavigation = ({
  component: Component,
  title,
  to,
  style,
  styleBefore,
  
}) => {

    const { toggle } = useToggleModal();

  return (
    <li className={`flex items-center justify-between pt-[4px] pb-[4px] ${style}`} onClick={toggle}>
          <NavLink to={to} className={`flex gap-[4px] items-center ${styleBefore}`}>{Component }{title}</NavLink>
    </li>
  );
};

ItemNavigation.propTypes = {
  component: PropTypes.node,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  style: PropTypes.string,
  styleBefore: PropTypes.string,
};
