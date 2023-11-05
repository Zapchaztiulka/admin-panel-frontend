import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";

import "./styles.css";
import { MessageTemplate } from "../MessageTemplate";
import { ChatFooter } from "../ChatFooter";
import { InfoIcon } from "../../../images/icons";
import { cutFirstLetter } from "../../../utils";

import { selectUser } from "../../../redux/auth/selectors";
import { selectActiveChatRoom } from "../../../redux/chat/selectors";
import {
  updateManager,
  closeChat,
  addMessage,
} from "../../../redux/chat/actions";

export const ChatWithClient = ({ chatRoom, onFinishChat }) => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);
  const messageContainerRef = useRef(null);
  const activeChatRoom = useSelector((state) =>
    selectActiveChatRoom(state, chatRoom._id)
  );

  const {
    userId,
    managerId,
    managerName,
    managerSurname,
    username,
    userSurname,
    isOnline,
    isChatRoomProcessed,
    isChatRoomOpen,
  } = activeChatRoom;
  const isTheSameManager = manager.id === managerId;

  const firstManagerLetters =
    cutFirstLetter(managerName) + cutFirstLetter(managerSurname);

  // handle to start new chat and update Redux state
  const handleStartChatByManager = () => {
    const { userId, _id } = chatRoom;
    const managerData = {
      userId,
      roomId: _id,
      manager,
      isChatRoomProcessed: true,
    };

    dispatch({ type: updateManager, payload: managerData });
    socket.emit("managerJoinToChat", managerData);
  };

  // handle to close chat by User
  useEffect(() => {
    socket.on("closeChatByUser", ({ room }) => {
      dispatch({
        type: closeChat,
        payload: { room },
      });

      const messageData = {
        roomId: room._id,
        message: {
          messageOwner: "Бот",
          messageType: "text",
          messageText: "Клієнт завершив чат. Переходьте до іншого",
          createdAt: Date.now(),
        },
      };

      dispatch({
        type: addMessage,
        payload: messageData,
      });
    });

    return () => {
      socket.off("closeChatByUser");
    };
  }, [dispatch]);

  // automatic scroll when new message is added
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const maxVisibleHeight = messageContainerRef.current.clientHeight;

      if (scrollHeight > maxVisibleHeight) {
        messageContainerRef.current.scrollTop = scrollHeight - maxVisibleHeight;
      }
    }
  }, [activeChatRoom]);

  return (
    <>
      <div>
        <header
          className="flex p-s border-b border-solid border-borderDefault
                     rounded-tr-medium justify-between items-end"
        >
          <div className="flex flex-col gap-xs3 items-start">
            <div className="font-500 text-base leading-6">
              {username
                ? `${username} ${userSurname}`
                : `Гість ${userId.slice(22, 24)}`}
            </div>
            <div className="flex gap-xs2">
              <div
                className={`text-[10px] leading-4 font-500 rounded-medium3 py-xs3 px-xs2 
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
                ${
                  isOnline &&
                  !isChatRoomOpen &&
                  "bg-bgDisable text-textSecondary"
                }`}
              >
                {isOnline && isChatRoomOpen && "Онлайн"}
                {isOnline && !isChatRoomOpen && "Чат згорнутий"}
                {!isOnline && "Оффлайн"}
              </div>
              {!isChatRoomProcessed && isOnline && (
                <div
                  className="text-[10px] leading-4 font-500 rounded-medium3 py-xs3 px-xs2
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
              <div
                className="inline-block font-500 rounded-[50%] leading-5 tracking-[-0.4px]
                        text-[10px] item-center text-textBrand bg-bgBrandLight2"
              >
                <span className="p-xs3">{firstManagerLetters}</span>
              </div>
              <div className="font-400 leading-4 text-xs text-textSecondary">
                {managerName} {managerSurname}
              </div>
            </div>
          )}
        </header>
        <section
          ref={messageContainerRef}
          className="flex flex-col gap-sPlus p-m message-container"
        >
          <>
            {activeChatRoom &&
              activeChatRoom?.messages.map((message, idx) => {
                const {
                  _id = idx,
                  messageOwner,
                  messageText,
                  messageType,
                  createdAt = Date.now(),
                } = message;
                return (
                  <MessageTemplate
                    key={_id}
                    owner={
                      messageOwner === "user"
                        ? `Клієнт`
                        : messageOwner === "Бот"
                        ? "Бот"
                        : isTheSameManager
                        ? "Ви"
                        : "Менеджер"
                    }
                    type={messageType}
                    text={messageText}
                    time={createdAt}
                  />
                );
              })}
          </>
        </section>
      </div>
      {isTheSameManager || (!isTheSameManager && !isChatRoomProcessed) ? (
        <ChatFooter
          chatRoom={chatRoom}
          onStartChat={handleStartChatByManager}
          onFinishChat={onFinishChat}
        />
      ) : (
        <div
          className="flex gap-xs3 p-xs m-m1 font-400 text-base leading-6 text-textError 
          border border-solid border-borderError rounded-medium bg-bgErrorLight items-center"
        >
          <InfoIcon />
          <div>Активний: Менеджера вже підключено</div>
        </div>
      )}
    </>
  );
};

ChatWithClient.propTypes = {
  chatRoom: PropTypes.object.isRequired,
  onFinishChat: PropTypes.func,
};
