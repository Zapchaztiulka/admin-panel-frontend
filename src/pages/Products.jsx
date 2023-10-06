
import { Outlet } from "react-router-dom";
import { BigButton } from "../components/Buttons/BigButton";
import { ButtonBlockIcon, PlusIcon } from "../utils/icons";

const Products = () => {
  return (

    <div>
      <h1>Products.....</h1>
      
      <div className="flex gap-[12px]">
        <BigButton
          to="edit"
          text="Додати товар"
          icon={<PlusIcon className="stroke-iconContrast" />}
          linkstyle={'bg-bgBrandLight3 text-textContrast'}
        />
        <BigButton
          to="add"
          text={'Множинне\nдодавання товарі'}
          icon={<PlusIcon className="stroke-iconBrand " />}
          linkstyle={'bg-bgBrandLight1 '}
        />
         <BigButton
          to="add"
          text={'Імпортувати\nданні з таблиці'}
          icon={<PlusIcon className="stroke-iconBrand " />}
          linkstyle={'bg-bgBrandLight1 '}
          bigIcon={<ButtonBlockIcon className="fill-textBrand absolute bottom-0 left-[132px]"/>}
        />
          
      </div>

         <Outlet />
    </div>
  );
};
export default Products;
