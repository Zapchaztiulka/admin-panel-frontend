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
  } = activeChatRoom;

  const firstManagerLetters = firstLetter(managerName, managerSurname);

  return (
    <header
      className="flex p-s border-b-[1px] border-solid border-borderDefault
                 rounded-tr-medium justify-between items-end"
    >
      <div className="flex flex-col gap-xs3 items-start">
        <div className="font-500 text-body">
          {username
            ? `${username} ${userSurname}`
            : `Гість ${userId.slice(22, 24)}`}
        </div>
        <div className="flex gap-xs2">
          <div
            className={`font-500 text-[10px] leading-4 rounded-medium3 py-xs3 px-xs2 
                ${
                  isOnline &&
                  isChatRoomOpen &&
                  "bg-bgSuccessDark text-textSuccess"
                }
                ${
                  isOnline &&
                  !isChatRoomOpen &&
                  "bg-bgWarningDark text-textWarning"
                }
                ${!isOnline && "bg-bgDisable text-textSecondary"}`}
          >
            {isOnline && isChatRoomOpen && "Онлайн"}
            {isOnline && !isChatRoomOpen && "Чат згорнутий"}
            {!isOnline && "Оффлайн"}
          </div>
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
