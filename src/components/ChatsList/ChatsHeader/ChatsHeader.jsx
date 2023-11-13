import PropTypes from "prop-types";

import { BellIcon } from "@/components/Icons/ChatIcons";

export const ChatsHeader = ({ unprocessedChatRooms }) => {
  return (
    <>
      <h6 className="font-400 text-textTertiary text-caption mb-m">
        Чатбот / <span className="text-textPrimary">Чати з клієнтами</span>
      </h6>
      <div className="flex justify-between">
        <h1 className="font-500 text-textTertiary text-heading4 mb-m">
          Чати з клієнтами
        </h1>
        <div className="relative">
          <BellIcon />
          {unprocessedChatRooms.length > 0 && (
            <div
              className="absolute top-[0] right-[0] flex items-center justify-center 
                        w-xs h-xs font-400 text-[8px] text-iconContrast leading-4
                        bg-bgBrandDark rounded-[50%]"
            >
              <span>{unprocessedChatRooms.length} </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

ChatsHeader.propTypes = {
  unprocessedChatRooms: PropTypes.arrayOf(PropTypes.object.isRequired)
    .isRequired,
};
