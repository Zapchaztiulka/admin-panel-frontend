import PropTypes from "prop-types";

import { Link } from "react-router-dom";

export const BigButton = ({
  to,
  text,
  icon: Icon,
  linkstyle,
  bigIcon: BigIcon,
}) => {
  return (
    <div className="w-[230px] h-[116px] relative desktop1200:w-[270px] overflow-hidden">
      <Link
        to={to}
        className={`flex gap-[8px] items-end w-[100%] h-[116px] pl-[12px] pr-[12px] pb-[16px]
               rounded-[8px] ${linkstyle} text-[16px] font-500 leading-[1.4] tracking-[-0.24px]
                text-textBrand  whitespace-pre-wrap`}
      >
        {text}
        {Icon} {BigIcon}
      </Link>
    </div>
  );
};

BigButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  linkstyle: PropTypes.string.isRequired,
  bigIcon: PropTypes.node,
};
