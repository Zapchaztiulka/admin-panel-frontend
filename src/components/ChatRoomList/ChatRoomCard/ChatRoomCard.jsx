import PropTypes from "prop-types";

import "./slyles.css";
import { formatDate } from "../../../utils/formatDate";
import { cutFirstLetter } from "../../../utils/cutFirstLetter";
import { Avatar } from "../../../images/icons";

export const ChatRoomCard = ({ room, onConnectClick }) => {
  const { username, userSurname, messages, createdAt, isOnline } = room;
  const firstLetters = cutFirstLetter(username) + cutFirstLetter(userSurname);

  let firstClientMessage = null;
  if (messages.length > 0) {
    const message = messages.find((message) => message.messageOwner === "user");
    if (message) {
      firstClientMessage = message.messageText.slice(0, 25) + "...";
    }
  }

  return (
    <button
      onClick={onConnectClick}
      className="relative flex p-s gap-xs2 bg-bgWhite hover:bg-bgHoverGrey border-b border-solid border-borderDefault cursor-pointer"
    >
      <div className="text-textBrand font-500 rounded-[50%] bg-bgBrandLight2">
        {username ? (
          <div className="w-m1 h-m1 p-xs2">{firstLetters}</div>
        ) : (
          <Avatar />
        )}
      </div>
      <div className="flex flex-col gap-xs2 items-start w-full">
        <div className="font-500 text-base text-textPrimary leading-6">
          {username ? `${username} ${userSurname}` : "Анонімний клієнт"}
        </div>
        <div className="flex font-400 text-sm text-textTertiary leading-5 truncate">
          {firstClientMessage ? (
            <span>{firstClientMessage}</span>
          ) : (
            <span className="italic">Повідомлення відсутні ...</span>
          )}
        </div>
        <div className="font-400 text-xs text-textTertiary leading-4">
          {formatDate(createdAt)}
        </div>
      </div>
      <div className="absolute top-s right-xs4 text-bgWhite">
        {isOnline ? (
          <div className="bg-iconSuccess px-xs2 py-xs3 rounded-minimal">
            on-line
          </div>
        ) : (
          <div className="bg-iconError px-xs2 py-xs3 rounded-minimal">
            off-line
          </div>
        )}
      </div>
    </button>
  );
};

ChatRoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  onConnectClick: PropTypes.func,
};
