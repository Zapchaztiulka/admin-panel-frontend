import { LogoIcon } from "../Icons/Logo/LogoIcon"
// import { LogoIconWithText } from "../Icons/Logo/LogoIconWithText"
// import { Navigation } from "./Navigation"

export const AppBar = () => {

    return (
        <header className="fixed top-0 left-0 z-10  w-[100%] bg-bgBrandLight3">
            <LogoIcon color1="#fff" color2="#fff" size="96"/>
        </header>
    )
}
