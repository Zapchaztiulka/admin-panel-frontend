import { MenuIcon } from "../../utils/icons"
import { LogoIcon } from "../Icons/Logo/LogoIcon"

export const InfoHeaderSDevice = () => {

    return (
        <div className="flex justify-between items-center pr-s pl-s pt-xs2 pb-xs3">
        <button type="button">
          <MenuIcon className="w-[44px] h-[44px] stroke-iconContrast" />
        </button>
        <a href="/">
          <LogoIcon color1="#fff" color2="#fff" size="44" />
        </a>
      </div>
    )
}