import PropTypes from "prop-types";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { nanoid } from "nanoid";

export const Slider = ({ itemsArray, sliderOptions, extraOptions }) => {
  return (
    <Splide options={{ ...sliderOptions, ...extraOptions }}>
      {itemsArray.map((item) => (
        <SplideSlide key={nanoid()}>{item}</SplideSlide>
      ))}
    </Splide>
  );
};

Slider.propTypes = {
  itemsArray: PropTypes.array.isRequired,
  sliderOptions: PropTypes.object.isRequired,
  extraOptions: PropTypes.oneOfType([
    PropTypes.shape({
      padding: PropTypes.shape({
        left: PropTypes.string,
        right: PropTypes.string,
      }),
      width: PropTypes.string,
      gap: PropTypes.string,
      fixedWidth: PropTypes.string,
    }),
    PropTypes.bool,
  ]),
};
