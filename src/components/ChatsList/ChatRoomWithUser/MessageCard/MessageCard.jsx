import React from "react";
import PropTypes from "prop-types";
import { formatDate } from "@/utils";

export const MessageCard = React.memo(
  ({ owner = "Бот", text, type, time = Date.now() }) => {
    return (
      <>
        <div
          className={`font-400 tracking-button rounded-medium
                      text-textPrimary flex flex-col gap-xs3 p-xs w-[60%]
                        ${
                          owner === "Ви" || owner === "Менеджер"
                            ? "bg-bgBrandLight1 self-end"
                            : owner === "Бот"
                            ? "bg-bgGreyLigth self-start"
                            : "bg-bgBrandLight2 self-start"
                        }
                        ${
                          type !== "text" &&
                          "bg-bgWhite border-[1px] border-solid border-borderDefault"
                        }`}
          style={{ whiteSpace: "pre-line", wordWrap: "break-word" }}
        >
          <p className="font-500 text-[12px] text-textTertiary">{owner}</p>
          {type === "text" && (
            <p className="text-body text-textPrimary self-stretch">{text}</p>
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
  }
);

MessageCard.displayName = "MessageCard";

MessageCard.propTypes = {
  owner: PropTypes.string,
  text: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  time: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
