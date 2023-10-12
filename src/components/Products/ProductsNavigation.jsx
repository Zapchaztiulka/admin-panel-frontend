import { ButtonBlockIcon, PlusIcon } from "../../utils/icons";
import { BigButton } from "../Buttons/BigButton";

export const ProductsNavigation = () => {
    return (
   
    <ul className="hidden tablet768:flex tablet768:gap-[12px] ">
      <li>
        <BigButton
          to="edit"
          text="Додати товар"
          icon={<PlusIcon className="stroke-iconContrast" />}
          linkstyle={"bg-bgBrandLight3 text-textContrast"}
        />
      </li>

      <li>
        <BigButton
          to="add"
          text={"Множинне\nдодавання товарі"}
          icon={<PlusIcon className="stroke-iconBrand " />}
          linkstyle={"bg-bgBrandLight1 "}
        />
      </li>

      <li>
        <BigButton
          to="add"
          text={"Імпортувати\nданні з таблиці"}
          icon={<PlusIcon className="stroke-iconBrand " />}
          linkstyle={"bg-bgBrandLight1 "}
          bigIcon={
            <ButtonBlockIcon className="fill-textBrand absolute bottom-0 left-[132px]" />
          }
        />
      </li>
            </ul>
           
  );
};
