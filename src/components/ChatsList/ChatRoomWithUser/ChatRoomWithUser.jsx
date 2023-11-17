import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";

import "./styles.css";
import { ChatRoomHeader } from "./ChatRoomHeader";
import { ChatRoomFooter } from "./ChatRoomFooter";
import { MessageCard } from "./MessageCard";
import { BtnLoader } from "@/components/Loader";
import { InfoIcon } from "@/components/Icons/ChatIcons";

import { selectUser } from "@/redux/auth/selectors";
import {
  selectActiveChatRoom,
  selectSelectedRoomId,
} from "@/redux/chat/selectors";
import { updateManager } from "@/redux/chat/actions";

export const ChatRoomWithUser = ({ chatRoom, isOpenModal }) => {
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const messageContainerRef = useRef(null);

  const manager = useSelector(selectUser);
  const selectedRoomId = useSelector(selectSelectedRoomId);
  const activeChatRoom = useSelector((state) =>
    selectActiveChatRoom(state, chatRoom._id)
  );

  const isTheSameManager = manager.id === activeChatRoom?.managerId;

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

  // handle to typing by User
  useEffect(() => {
    socket.on("userTyping", ({ isTyping, roomId }) => {
      if (isTyping && roomId === selectedRoomId) {
        setIsTyping(true);
      } else setIsTyping(false);
    });

    return () => {
      socket.off("userTyping");
    };
  }, [selectedRoomId]);

  // automatic scroll when new message is added
  useEffect(() => {
    if (messageContainerRef.current) {
      const scrollHeight = messageContainerRef.current.scrollHeight;
      const maxVisibleHeight = messageContainerRef.current.clientHeight;

      if (scrollHeight > maxVisibleHeight) {
        messageContainerRef.current.scrollTop = scrollHeight - maxVisibleHeight;
      }
    }
  }, [activeChatRoom, isTyping]);

  return (
    <>
      <div>
        <ChatRoomHeader activeChatRoom={activeChatRoom} />
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
                  createdAt,
                } = message;
                const owner =
                  messageOwner === "user"
                    ? `Клієнт`
                    : messageOwner === "Бот"
                    ? "Бот"
                    : isTheSameManager
                    ? "Ви"
                    : "Менеджер";
                return (
                  <MessageCard
                    key={_id}
                    owner={owner}
                    type={messageType}
                    text={messageText}
                    time={createdAt}
                    isTyping={isTyping}
                  />
                );
              })}
            {isTyping && isTheSameManager && (
              <div className="flex gap-xs2">
                <div className="font-400 text-caption text-textTertiary">
                  Клієнт друкує повідомлення
                </div>
                <BtnLoader height={20} width={48} radius={8} />
              </div>
            )}
          </>
        </section>
      </div>
      {isTheSameManager ||
      (!isTheSameManager && !activeChatRoom?.isChatRoomProcessed) ? (
        <ChatRoomFooter
          chatRoom={chatRoom}
          onStartChat={handleStartChatByManager}
          isOpenModal={isOpenModal}
        />
      ) : (
        <div className="flex flex-col gap-m2">
          <div
            className="flex gap-xs3 p-xs self-center font-400 text-body text-textError border-1
             border-solid border-borderError rounded-medium bg-bgErrorLight items-center"
          >
            <InfoIcon />
            <p>Активний: Менеджера вже підключено</p>
          </div>
          <ChatRoomFooter bg />
        </div>
      )}
    </>
  );
};

ChatRoomWithUser.propTypes = {
  chatRoom: PropTypes.object.isRequired,
  isOpenModal: PropTypes.func.isRequired,
};
