import { useToggleModal } from "../../hooks/useToggleModal";
import { LogOutButton } from "../Buttons/LogOutButton";
import { ModalContainer } from "../Modal/ModalContainer";
import { UserInfo } from "../UserInfo";
import { LogoAndMenu } from "./LogoAndMenu";
import { Navigation } from "./Navigation";

export const AppBar = () => {
  const { isOpen, open, toggle } = useToggleModal();
  return (
    <header
      className="fixed top-0 left-0 z-10  w-full bg-bgBrandLight3 
     tablet1024:w-[250px] tablet1024:bg-bgGreyLigth tablet1024:border-r-1 tablet1024:h-[100vh]
     tablet1024:border-borderDefault tablet1024:rounded-tr-minimal tablet1024:rounded-br-minimal"
    >
      <LogoAndMenu openModal={open} />

      <div
        className="hidden tablet1024:block 
      absolute z-30 top-0 left-0 pt-m pb-m pr-xs pl-xs h-[100vh] w-full">
        <UserInfo />
        <Navigation />
        <LogOutButton />
      </div>

      {isOpen && (
        <ModalContainer toggle={toggle} styleContainer={'tablet1024:hidden'} isOpen={isOpen}>
          <UserInfo />
          <Navigation toggle={toggle} />
          <LogOutButton />
        </ModalContainer>
      )}
    </header>
  );
};
