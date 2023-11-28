import PropTypes from "prop-types";

import { MenuIcon } from "../../utils/icons"
import { LogoIcon } from "../Icons/Logo/LogoIcon"

export const LogoAndMenu = ({openModal}) => {

    return (
         <div className="flex justify-between items-center pr-s pl-s pt-xs2 pb-xs3
     mobile480:pr-m mobile480:pl-m tablet1024:hidden">
        <button type="button" onClick={openModal}>
          <MenuIcon className="w-[44px] h-[44px] stroke-iconContrast" />
        </button>
        <a href="/">
          <LogoIcon color1="#fff" color2="#fff" size="44" />
        </a>
      </div>
    )
}

LogoAndMenu.propTypes = {
  openModal: PropTypes.func.isRequired,
};