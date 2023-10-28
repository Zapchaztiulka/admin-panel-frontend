import PropTypes from "prop-types";

import { formatDate } from "../../../utils/formatDate";

export const MessageTemplate = ({ owner = "Бот", text, type, time }) => {
  return (
    <>
      <div
        className={`font-sans font-400 tracking-button rounded-medium text-textPrimary flex flex-col gap-xs3 p-xs w-5/6
                  ${
                    owner === "Ви"
                      ? "bg-bgBrandLight1 self-end"
                      : owner === "Бот"
                      ? "bg-bgGreyLigth self-start"
                      : "bg-bgBrandLight2 self-start"
                  }
                  ${
                    type !== "text" &&
                    "bg-bgWhite border border-solid border-borderDefault"
                  }`}
        style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
      >
        <p className="font-500 text-xs text-textTertiary">{owner}</p>
        {type === "text" && (
          <p className="text-base text-textPrimary self-stretch">{text}</p>
        )}
        {type === "image" && (
          <div className="max-w-xs h-auto">
            <img src={text} alt={`Image ${time}`} />
          </div>
        )}
        <p className="text-[10px] text-textTertiary self-end">
          {formatDate(time)}
        </p>
      </div>
    </>
  );
};

MessageTemplate.propTypes = {
  owner: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
