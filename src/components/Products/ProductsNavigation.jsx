import { useEffect, useState } from "react";
import { ButtonBlockIcon, PlusIcon } from "../../utils/icons";
import { BigButton } from "../Buttons/BigButton";
import { Slider } from "../Common/Slider";
import {
  extraOptions1200,
  extraOptions480,
  extraOptions768,
  mainSliderOptions,
} from "../../utils/constants";
const itemsArray = [
          <BigButton
            key="Додати товар"
            to="edit"
            text="Додати товар"
            icon={<PlusIcon className="stroke-iconContrast" />}
            linkstyle={"bg-bgBrandLight3 text-textContrast"}
          />,
          <BigButton
            key="Множинне додавання товарі"
            to="add"
            text={"Множинне\nдодавання товарі"}
            icon={<PlusIcon className="stroke-iconBrand " />}
            linkstyle={"bg-bgBrandLight1 "}
          />,
          <BigButton
            key="Імпортувати данні з таблиці"
            to="adds"
            text={"Імпортувати\nданні з таблиці"}
            icon={<PlusIcon className="stroke-iconBrand " />}
            linkstyle={"bg-bgBrandLight1 "}
            bigIcon={
              <ButtonBlockIcon className="absolute bottom-[0] left-[132px] fill-textBrand desktop1200:w-[138px] desktop1200:h-[109px]" />
            }
          />,
        ]
export const ProductsNavigation = () => {
  const [isMobile480, setIsMobile480] = useState(
    window.innerWidth >= 480 && window.innerWidth < 768
  );
  const [isTablet768, setIsTablet768] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1200
  );
  const [isDesktop1200, setIsDesktop1200] = useState(window.innerWidth >= 1200);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile480(window.innerWidth >= 480 && window.innerWidth < 768);
      setIsTablet768(window.innerWidth >= 768 && window.innerWidth < 1200);
      setIsDesktop1200(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="absolute left-[0] w-[100%]  tablet768:static tablet768:w-[720px] desktop1200:w-[850px]">
      <Slider
        sliderOptions={mainSliderOptions}
        extraOptions={
          (isMobile480 && extraOptions480) ||
          (isTablet768 && extraOptions768) ||
          (isDesktop1200 && extraOptions1200)
        }
        itemsArray={itemsArray}
      />
    </div>
  );
};
