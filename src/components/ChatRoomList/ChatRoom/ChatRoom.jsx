import PropTypes from "prop-types";

import "./slyles.css";
import { formatDate } from "../../../helpers";

export const ChatRoom = ({ room, onConnectClick }) => {
  return (
    <button
      onClick={onConnectClick}
      className="flex gap-5 px-8 py-3 bg-bgBrandLight1 hover:bg-bgPressedBlue cursor-pointer rounded-medium2 justify-between items-center"
    >
      {room.isOnline ? (
        <div className="w-6 h-6 rounded-large2 bg-iconSuccess animate-pulse"></div>
      ) : (
        <div className="w-6 h-6 rounded-large2 bg-bgDefaultDestructive"></div>
      )}

      <div className="flex font-sans font-600 text-base w-full justify-around items-center">
        <div>
          Ім`я клієнта:
          <span className="font-400 text-lg text-textBrand ml-1">
            {room.username ? room.username : "Anonymous"}
          </span>
        </div>
        <div>
          Створений:
          <span className="font-400 text-textTertiary ml-1">
            {formatDate(room.createdAt)}
          </span>
        </div>
      </div>
    </button>
  );
};

ChatRoom.propTypes = {
  room: PropTypes.object.isRequired,
  onConnectClick: PropTypes.func,
};
