import { useAuth } from "../hooks"
import { changeFirstLetter } from "../utils/changeFirstLetter";
import { cutFirstLetter } from "../utils/cutFirstLetter";

export const UserInfo = () => {
    const { user } = useAuth();
  
    return (
     
        <div className="flex items-center p-[4px] mb-[24px]  tablet1024:mr-0  ">
            <div className="flex justify-center items-center mr-[8px] w-[36px] h-[36px] rounded-[50%]
            text-textBrand tracking-[-0.4px] font-500 bg-bgBrandLight2 ">
                {cutFirstLetter(user.username)}{cutFirstLetter(user.userSurname)}
            </div>
            <p className="w-[176px] mobile375:w-[219px] tablet1024:w-[174px] max-h-[40px] 
            text-ellipsis">{changeFirstLetter(user.username, user.userSurname)} </p>
        </div>

    )
}

// line-clamp-2    
