import PropTypes from "prop-types";

import { MenuIcon } from "../../utils/icons"
import { LogoIcon } from "../Icons/Logo/LogoIcon"

export const LogoAndMenu = ({openModal}) => {

    return (
         <div className="flex justify-between items-center pr-[16px] pl-[16px] pt-[8px] pb-[4px]
     mobile480:pr-[24px] mobile480:pl-[24px] tablet1024:hidden">
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