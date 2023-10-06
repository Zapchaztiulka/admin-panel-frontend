import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { BigButton } from "../Buttons/BigButton";
import { ButtonBlockIcon, PlusIcon } from "../../utils/icons";
export const DotsSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  };
  return (
    <Slider {...settings}>
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
    </Slider>
  );
} 
