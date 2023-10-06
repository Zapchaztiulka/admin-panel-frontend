import { LogOutIcon } from "../../utils/icons"

export const LogOutButton = () => {
    return (
        <button type='button' className="absolute bottom-[24px] left-[16px] 
        flex gap-[4px] items-center pr-[8px] pl-[8px] pt-[4px] pb-[4px] w-[92%]
        rounded-[4px] hover:bg-bgHoverGrey active:bg-bgPressedGrey">
<LogOutIcon className="stroke-iconPrimary"/> Вихід
        </button>
    )
}