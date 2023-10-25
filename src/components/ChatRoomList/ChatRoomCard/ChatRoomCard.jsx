import PropTypes from "prop-types";

import "./slyles.css";
import { formatDate } from "../../../utils/formatDate";

export const ChatRoomCard = ({ room, onConnectClick }) => {
  return (
    <button
      onClick={onConnectClick}
      className="flex gap-m px-m1 py-xs bg-bgWhite hover:bg-bgHoverGrey
       border border-solid border-borderDefaultBlue  cursor-pointer rounded-medium2 justify-between items-center"
    >
      {room.isOnline && !room.isChatRoomProcessed && (
        <div className="p-xs text-sm text-textContrast rounded-large2 bg-iconSuccess animate-pulse">
          Клієнт очікує ...
        </div>
      )}

      {room.isOnline && room.isChatRoomProcessed && (
        <div className="p-xs text-xs text-textContrast rounded-large2 bg-iconWarning">
          {`Клієнта обслуговує менеджер ${room.managerName} ${room.managerSurname}`}
        </div>
      )}

      {!room.isOnline && (
        <div className="p-xs text-xs text-textContrast rounded-large2 bg-bgDefaultDestructive">
          Чат незавершений, клієнт в off-line
        </div>
      )}

      <div className="flex font-sans font-600 text-base w-full justify-around items-center">
        <div>
          Ім`я клієнта:
          <span className="font-400 text-lg text-textBrand ml-xs3">
            {room.username ? room.username : "Anonymous"}
          </span>
        </div>
        <div>
          Створений:
          <span className="font-400 text-textTertiary ml-xs3">
            {formatDate(room.createdAt)}
          </span>
        </div>
      </div>
    </button>
  );
};

ChatRoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  onConnectClick: PropTypes.func,
};
