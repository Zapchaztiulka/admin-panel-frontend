import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "./slyles.css";
import {
  firstLetter,
  cutFullName,
  getLastClientMessage,
  getUnreadClientMessages,
} from "@/utils";
import { Avatar } from "@/components/Icons/ChatIcons";
import { selectUser } from "@/redux/auth/selectors";

export const ChatRoomCard = ({ room, onConnectClick, isSelected }) => {
  const manager = useSelector(selectUser);
  const {
    userId,
    username,
    userSurname,
    managerId,
    managerName,
    managerSurname,
    messages,
    isOnline,
    isChatRoomOpen,
    isChatRoomProcessed,
    isLeavePage,
  } = room;

  const chatNumber = userId.slice(22, 24);

  // get first letters for avatar
  const firstClientLetters = firstLetter(username, userSurname);
  const firstManagerLetters = firstLetter(managerName, managerSurname);

  // get unread messages
  const countUnreadClientMessages = getUnreadClientMessages(messages);

  // get last message and cut it
  const [lastClientMessage, setLastClientMessage] = useState(
    getLastClientMessage(messages) || null
  );
  const { messageText, waitingTime } = lastClientMessage;
  const isTheSameManager = manager.id === managerId;

  useEffect(() => {
    setLastClientMessage(getLastClientMessage(messages));
  }, [messages]);

  // get cutting user name and change its length according to the window width
  const screenWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const [cuttingUsername, setCuttingUsername] = useState(
    cutFullName(username, userSurname, chatNumber, screenWidth) || null
  );

  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

      setCuttingUsername(
        cutFullName(username, userSurname, chatNumber, newScreenWidth)
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chatNumber, userSurname, username]);

  return (
    <button
      onClick={onConnectClick}
      className={`relative flex p-xs gap-xs2 border-b-1 border-solid border-borderDefault cursor-pointer rounded-tl-medium ${
        isSelected ? "bg-bgBrandLight3" : "bg-bgWhite"
      }`}
    >
      <div
        className="relative min-w-[36px] h-[36px] flex bg-bgBrandLight2 
                      items-center justify-center rounded-[50%] avatar-wrapper"
      >
        {username ? (
          <p className="text-caption text-textBrand font-500 leading-none">
            {firstClientLetters}
          </p>
        ) : (
          <Avatar />
        )}
        <div
          className={`absolute bottom-[0] right-[0] w-s h-s border-2 border-solid
                    border-iconWhite rounded-medium3 
                      ${
                        isOnline &&
                        isChatRoomOpen &&
                        !isLeavePage &&
                        "bg-iconSuccess"
                      } 
                      ${isOnline && !isChatRoomOpen && "bg-iconWarning"} 
                      ${isOnline && isLeavePage && "bg-iconWarning"} 
                      ${!isOnline && "bg-iconSecondary"}
          `}
        ></div>
        <div
          className="description hidden absolute top-[100%] left-[50%] text-textContrast 
                   bg-bgGreyDark p-xs2 rounded-medium whitespace-nowrap z-10"
        >
          {isOnline && isChatRoomOpen && "Користувач онлайн"}
          {isOnline && !isChatRoomOpen && "Користувач згорнув чат"}
          {!isOnline && "Користувач оффлайн"}
        </div>
      </div>
      <div className="flex flex-col gap-xs2 items-start w-full">
        <div className="flex gap-xs2">
          <div
            className={`text-[10px] leading-4 font-500 rounded-medium3 py-xs3 px-xs2 whitespace-nowrap ${
              !isChatRoomProcessed
                ? isSelected
                  ? "bg-bgWarningDark text-textWarning"
                  : "bg-bgSuccessDark text-textSuccess"
                : "bg-bgBrandLight1 text-textBrand"
            }`}
          >
            {!isChatRoomProcessed && "Новий"}
            {isChatRoomProcessed && !isTheSameManager && "В процесі"}
            {isChatRoomProcessed && isTheSameManager && "Мій чат"}
          </div>
          <div
            className={`font-500 text-body truncate ${
              isSelected ? "text-textContrast" : "text-textPrimary"
            }`}
          >
            {cuttingUsername}
          </div>
        </div>
        <div
          className={`flex font-400 text-sm leading-5 truncate ${
            isSelected ? "text-textContrast" : "text-textTertiary"
          }`}
        >
          {messageText ? (
            <span>{messageText}</span>
          ) : (
            <span className="italic">Повідомлення відсутні ...</span>
          )}
        </div>
        {isChatRoomProcessed && (
          <div className="flex gap-xs3 justify-start items-center">
            <div className="font-500 rounded-[50%] leading-5 tracking-[-0.4px] text-[10px] text-textBrand bg-bgBrandLight2">
              <span className="p-xs3">{firstManagerLetters}</span>
            </div>
            <div
              className={`font-400 leading-4 text-[12px] ${
                isSelected ? "text-textContrast" : "text-textSecondary"
              }`}
            >
              {managerName} {managerSurname}
            </div>
          </div>
        )}
      </div>
      {isOnline && (
        <div className="flex flex-col gap-s items-center justify-center">
          {waitingTime && (
            <div
              className={`font-500 text-[12px] leading-5 whitespace-nowrap 
                          ${
                            isSelected
                              ? "text-textContrast"
                              : "text-textSecondary"
                          } 
                          ${waitingTime >= 2 && "pulse"}`}
            >
              {waitingTime} хв
            </div>
          )}
          {countUnreadClientMessages && !isSelected && (
            <div className="font-400 text-[12px] text-iconContrast leading-4 w-s h-s bg-bgBrandDark rounded-[50%]">
              {countUnreadClientMessages}
            </div>
          )}
        </div>
      )}
    </button>
  );
};

ChatRoomCard.propTypes = {
  room: PropTypes.object.isRequired,
  onConnectClick: PropTypes.func,
  isSelected: PropTypes.bool,
};
