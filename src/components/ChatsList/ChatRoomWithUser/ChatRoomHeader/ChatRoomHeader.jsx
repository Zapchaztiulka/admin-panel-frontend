import PropTypes from "prop-types";

import { firstLetter } from "@/utils";

export const ChatRoomHeader = ({ activeChatRoom }) => {
  const {
    userId,
    managerName,
    managerSurname,
    username,
    userSurname,
    isOnline,
    isChatRoomProcessed,
    isChatRoomOpen,
    isLeavePage,
  } = activeChatRoom;

  const firstManagerLetters = firstLetter(managerName, managerSurname);

  return (
    <header
      className="flex p-s border-b-1 border-solid border-borderDefault
                 rounded-tr-medium justify-between items-end"
    >
      <div className="flex flex-col gap-xs3 items-start">
        <div className="font-500 text-body">
          {username
            ? `${username} ${userSurname}`
            : `Гість ${userId.slice(22, 24)}`}
        </div>
        <div className="flex gap-xs2">
          {!isOnline && (
            <div className="font-500 text-[10px] leading-4 rounded-medium3 py-xs3 px-xs2 bg-bgDisable text-textSecondary">
              Оффлайн
            </div>
          )}
          {isOnline && (
            <div
              className={`font-500 text-[10px] leading-4 rounded-medium3 py-xs3 px-xs2 
                ${
                  isChatRoomOpen &&
                  !isLeavePage &&
                  "bg-bgSuccessDark text-textSuccess"
                }
                ${
                  (!isChatRoomOpen || isLeavePage) &&
                  "bg-bgWarningDark text-textWarning"
                } 
                `}
            >
              {isChatRoomOpen && !isLeavePage && "Онлайн"}
              {(!isChatRoomOpen || isLeavePage) && "Чат згорнутий"}
            </div>
          )}
          {!isChatRoomProcessed && isOnline && (
            <div
              className="font-500 text-[10px] leading-4 rounded-medium3 py-xs3 px-xs2
                       bg-bgWarningDark text-textWarning"
            >
              Очікує менеджера
            </div>
          )}
        </div>
      </div>
      {isChatRoomProcessed && (
        <div className="flex gap-xs3 items-center">
          <div>Обслуговує: </div>
          <div className="flex min-w-[24px] min-h-[24px] bg-bgBrandLight2 rounded-[50%] items-center justify-center">
            <div className="font-500 text-[10px] leading-none tracking-[-0.4px] text-textBrand">
              {firstManagerLetters}
            </div>
          </div>
          <div className="font-400 leading-4 text-[12px] text-textSecondary whitespace-nowrap">
            {managerName} {managerSurname}
          </div>
        </div>
      )}
    </header>
  );
};

ChatRoomHeader.propTypes = {
  activeChatRoom: PropTypes.object.isRequired,
};
