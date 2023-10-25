import { useState } from "react";
import { TextField } from 'universal-components-frontend/src/components/inputs'
import {InputPassword} from 'universal-components-frontend/src/components/inputs'
// import {EyeIcon} from 'universal-components-frontend/src/components/icons'
// import {EyeOffIcon} from 'universal-components-frontend/src/components/icons'
import EyeIcon from 'universal-components-frontend/src/components/icons/universalComponents/EyeIcon'
import EyeOffIcon from 'universal-components-frontend/src/components/icons/universalComponents/EyeOffIcon'

// import { ValidationStatus } from 'universal-components-frontend/src/types/validationStatus'
import AttachIcon from 'universal-components-frontend/src/components/icons/universalComponents/AttachIcon'
import MenuIcon from 'universal-components-frontend/src/components/icons/universalComponents/MenuIcon'

const Statistics = () => {
    const [displayPassword, setDisplayPassword] = useState(true);
  const toogleDisplayPassword = () => {
    setDisplayPassword((prev) => !prev);
    console.log("click");
  };

  const clickOnIcon = () => {
    console.log('click');
  }
  return (
    <>
      <h1>Statisticsssssssssss</h1>
      {/* <TextField label='laaaaabel' /> */}
        <TextField
            label="Label"
            message="infooooo"
        asterisk={true}
        
            // iconRight={<AttachIcon />}
            // iconLeft={<MenuIcon />}
            // onRightIconClick={clickOnIcon}
            messageClassName="text-textInputDefault"
            inputClassName="pr-[80px] w-[100%]"
      />
          <TextField
            label="Label"
            status='error'
            message="infooooo"
            asterisk={true}
            iconRight={<AttachIcon color='#2E90FA' />}
            disabled={true}
        messageClassName="text-textInputDefault"
        inputClassName="pr-[80px] w-[100%] "
        
        
          />
       <TextField
            label="Label"
            message="infooooo"
            asterisk={true}
            iconRight={<AttachIcon />}
            iconLeft={<MenuIcon />}
            onRightIconClick={clickOnIcon}
            messageClassName="text-textInputDefault"
        inputClassName="pr-[80px] w-[100%]"
   
      />
      <TextField
            label="Label"
            message="infooooo"
            asterisk={true}
            iconRight={<AttachIcon />}
            iconLeft={<MenuIcon />}
            onRightIconClick={clickOnIcon}
            messageClassName="text-textInputDefault"
        inputClassName="pr-[80px] w-[100%] "
   
      />
      
         <InputPassword
            
            type={displayPassword ? "text" : "password"}
            toogleDisplayPassword={toogleDisplayPassword}
            icon={displayPassword ? <EyeIcon size='16'  /> : <EyeOffIcon size='16' />}
        inputClassName='pr-[38px] border-borderDefaultBlue  w-[100%]'
       
          />
    </>
  );
};

export default Statistics;
// iconBoxClassName='bottom-xs right-xs'
 //  iconBoxClassName='gap-xs2'