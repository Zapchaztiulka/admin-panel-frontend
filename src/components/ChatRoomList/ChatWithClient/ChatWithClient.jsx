import PropTypes from "prop-types";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";

import "./styles.css";
import { MessageTemplate } from "../MessageTemplate";
import { ChatFooter } from "../ChatFooter";
import { selectUser } from "../../../redux/auth/selectors";
import { selectActiveChatRoom } from "../../../redux/chat/selectors";
import { updateManager, addMessage } from "../../../redux/chat/actions";

export const ChatWithClient = ({ chatRoom, onBackClick }) => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);
  const messageContainerRef = useRef(null);
  const activeChatRoom = useSelector((state) =>
    selectActiveChatRoom(state, chatRoom._id)
  );

  // send emit when manager entered in chat room and update Redux state
  useEffect(() => {
    const { userId, _id } = chatRoom;
    const managerData = {
      userId,
      roomId: _id,
      manager,
      isChatRoomProcessed: true,
    };

    dispatch({ type: updateManager, payload: managerData });
    socket.emit("managerJoinToChat", managerData);
  }, [chatRoom, dispatch, manager]);

  // handle new message from user
  useEffect(() => {
    socket.on("userMessage", ({ roomId, message }) => {
      dispatch({
        type: addMessage,
        payload: { roomId, message },
      });
    });

    return () => {
      socket.off("userMessage");
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
      <section
        ref={messageContainerRef}
        className="flex flex-col gap-sPlus py-sPlus message-container"
      >
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
                    ? `Клієнт ${activeChatRoom.username}`
                    : "Ви"
                }
                type={messageType}
                text={messageText}
                time={createdAt}
              />
            );
          })}
      </section>
      <ChatFooter chatRoom={chatRoom} onClick={onBackClick} />
    </>
  );
};

ChatWithClient.propTypes = {
  chatRoom: PropTypes.object.isRequired,
  onBackClick: PropTypes.func,
};
