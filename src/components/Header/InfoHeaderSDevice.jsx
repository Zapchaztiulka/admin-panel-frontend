import { MenuIcon } from "../../utils/icons"
import { LogoIcon } from "../Icons/Logo/LogoIcon"

export const InfoHeaderSDevice = () => {

    return (
        <div className="flex justify-between items-center pr-[16px] pl-[16px] pt-[8px] pb-[4px]">
        <button type="button">
          <MenuIcon className="w-[44px] h-[44px] stroke-iconWhite" />
        </button>
        <a href="/">
          <LogoIcon color1="#fff" color2="#fff" size="44" />
        </a>
      </div>
    )
}