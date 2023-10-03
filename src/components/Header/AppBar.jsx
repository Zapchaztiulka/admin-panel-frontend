import { useToggleModal } from "../../hooks/useToggleModal";
import { MenuIcon } from "../../utils/icons";
import { LogOutButton } from "../Buttons/LogOutButton";
import { LogoIcon } from "../Icons/Logo/LogoIcon";
import { ModalContainer } from "../Modal/ModalContainer";
import { UserInfo } from "../UserInfo";
import { Navigation } from "./Navigation"

export const AppBar = () => {
 
  const { isOpen, open,  toggle } = useToggleModal();
  return (
    <header className="fixed top-0 left-0 z-10  w-[100%] bg-bgBrandLight3">
     <div className="flex justify-between items-center pr-[16px] pl-[16px] pt-[8px] pb-[4px]">
        <button type="button" onClick={open}>
          <MenuIcon className="w-[44px] h-[44px] stroke-iconWhite" />
        </button>
        <a href="/">
          <LogoIcon color1="#fff" color2="#fff" size="44" />
        </a>
      </div>

      {isOpen && (
        <ModalContainer toggle={toggle}>
          <UserInfo />
          <Navigation toggle={toggle} />
          <LogOutButton />
        </ModalContainer>
      )}
    </header>
  );
};
