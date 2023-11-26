import { ColorRing } from "react-loader-spinner";
import "./styles.css";

export const LoaderFooter = () => {
  return (
    <ColorRing
      height={70}
      wrapperStyle={{ alignSelf: "center" }}
      colors={[
        "rgba(239, 248, 255, 0.6)",
        "rgba(209, 233, 255, 0.6)",
        "rgba(46, 144, 250, 0.6)",
        "rgba(21, 112, 239, 0.6)",
        "rgba(209, 233, 255, 0.6)",
      ]}
    />
  );
};
