import { useAuth } from "../hooks"
import { changeFirstLetter } from "../utils/changeFirstLetter";
import { cutFirstLetter } from "../utils/cutFirstLetter";

export const UserInfo = () => {
    const { user } = useAuth();
  
    return (
        <div className="flex gap-[8px] items-center pt-[4px] pb-[4px] pl-[4px] mb-[24px]">
            <div className="flex justify-center items-center w-[36px] h-[36px] rounded-[50%]
            text-textBrand tracking-[-0.4px] font-500 bg-bgBrandLight2 ">
                <span>{cutFirstLetter(user.username)}{cutFirstLetter(user.userSurname)}</span>
            </div>
            <h2>{changeFirstLetter(user.username, user.userSurname)} </h2>
        </div>
    )
}