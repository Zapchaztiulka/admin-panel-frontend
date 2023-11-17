import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "./socket";

import "./styles.css";
import { ChatsHeader } from "./ChatsHeader";
import { ChatRoomCard } from "./ChatRoomCard";
import { ChatRoomWithUser } from "./ChatRoomWithUser";
import { ChatRoomEmptyIcon, ChatListEmptyIcon } from "../Icons/ChatIcons";
import { ModalWarning } from "../Modal";

import { selectChatRooms } from "@/redux/chat/selectors";
import { selectToken, selectUser } from "@/redux/auth/selectors";
import {
  updateUserStatus,
  updateIsChatRoomOpen,
  createChatByUser,
  updateManager,
  disconnectManager,
  addMessage,
  closeChat,
  selectRoom,
} from "@/redux/chat/actions";
import { getChatRoomsInProgress, closeChatRoom } from "@/redux/chat/operations";

export const ChatsList = () => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);
  const storedToken = useSelector(selectToken);
  const chatRooms = useSelector(selectChatRooms);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const chatRoomsInProgress = chatRooms
    ?.filter((room) => room.chatRoomStatus === "in progress")
    .sort((a, b) => {
      if (a.isOnline && a.isChatRoomOpen && !a.isChatRoomProcessed) {
        return -1;
      } else if (a.isOnline && a.isChatRoomOpen && a.isChatRoomProcessed) {
        if (!(b.isOnline && b.isChatRoomOpen && !b.isChatRoomProcessed)) {
          return -1;
        } else {
          return 1;
        }
      } else if (!a.isOnline && a.isChatRoomProcessed) {
        if (b.isOnline && b.isChatRoomOpen && b.isChatRoomProcessed) {
          return -1;
        } else if (b.isOnline && b.isChatRoomOpen && !b.isChatRoomProcessed) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return b.isOnline && b.isChatRoomOpen && b.isChatRoomProcessed ? 1 : 0;
      }
    });

  // calculate a count of unprocessed chats
  const unprocessedChatRooms =
    chatRoomsInProgress?.filter(
      (room) => !room.isChatRoomProcessed && room.isOnline
    ) || [];

  // send token to the server for authentication
  useEffect(() => {
    socket.emit("authentication", { token: storedToken });
    setIsAuthenticated(true);
  }, [storedToken]);

  // handle authentication error
  socket.on("authenticationError", ({ message }) => {
    toast.error(message);
    setIsAuthenticated(false);
  });

  // fetch all chat rooms with status 'in progress'
  useEffect(() => {
    dispatch(getChatRoomsInProgress());
  }, [dispatch]);

  // handle to create new chat by User
  useEffect(() => {
    socket.on(
      "createChatByUser",
      ({ room, isOnline, isChatRoomOpen, username, userSurname }) => {
        dispatch({
          type: createChatByUser,
          payload: { room, isOnline, isChatRoomOpen, username, userSurname },
        });
      }
    );

    return () => {
      socket.off("createChatByUser");
    };
  }, [dispatch]);

  // handle to close chat by User
  useEffect(() => {
    socket.on("closeChatByUser", ({ room, username, userSurname }) => {
      dispatch({
        type: closeChat,
        payload: { room },
      });

      const chatNumber = room.userId.slice(22, 24);
      const messageData = {
        roomId: room._id,
        message: {
          messageOwner: "Бот",
          messageType: "text",
          messageText: `Клієнт ${
            username ? username + " " + userSurname : "Гість" + " " + chatNumber
          } завершив чат.`,
          createdAt: Date.now(),
        },
      };

      dispatch({
        type: addMessage,
        payload: messageData,
      });

      toast.info(messageData.message.messageText, { className: "toast-info" });
    });

    return () => {
      socket.off("closeChatByUser");
    };
  }, [dispatch]);

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

  // update chat room when user enters in chat or close one
  useEffect(() => {
    socket.on("userStatusChanged", ({ userId, isOnline }) => {
      dispatch({ type: updateUserStatus, payload: { userId, isOnline } });
    });

    return () => {
      socket.off("userStatusChanged");
    };
  }, [dispatch]);

  // update chat room and send message to manager when user minimizes or extends a chat room
  useEffect(() => {
    socket.on("chatRoomOpenChanged", ({ userId, isChatRoomOpen }) => {
      dispatch({
        type: updateIsChatRoomOpen,
        payload: { userId, isChatRoomOpen },
      });
    });

    return () => {
      socket.off("chatRoomOpenChanged");
    };
  }, [dispatch]);

  // handle to choose chat room by manager
  const handleConnectClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);

    dispatch({
      type: selectRoom,
      payload: chatRoom._id,
    });
  };

  // update store after another manager sended new message
  useEffect(() => {
    socket.on("managerMessage", ({ roomId, message, managerId }) => {
      if (manager.id !== managerId) {
        dispatch({
          type: addMessage,
          payload: { roomId, message },
        });
      }
    });

    return () => {
      socket.off("managerMessage");
    };
  }, [dispatch, manager.id]);

  // update store after another manager connection
  useEffect(() => {
    socket.on("managerJoinToChat", (room) => {
      const { userId, _id, managerId, managerName, managerSurname } = room;
      const managerData = {
        userId,
        roomId: _id,
        manager: {
          id: managerId,
          username: managerName,
          userSurname: managerSurname,
        },
        isChatRoomProcessed: true,
      };

      dispatch({ type: updateManager, payload: managerData });
    });

    return () => {
      socket.off("managerJoinToChat");
    };
  }, [dispatch]);

  // update store after another manager DISconnection
  useEffect(() => {
    socket.on("disconnectManager", (rooms = []) => {
      if (rooms.length > 0) {
        dispatch({ type: disconnectManager, payload: rooms });
      }
    });

    return () => {
      socket.off("disconnectManager");
    };
  }, [dispatch]);

  // handle to close chat by another manager
  useEffect(() => {
    socket.on("closeChatByManager", ({ room }) => {
      if (manager.id !== room.managerId) {
        dispatch({
          type: closeChat,
          payload: { room },
        });

        const { _id, managerName, managerSurname } = room;

        const messageData = {
          roomId: _id,
          message: {
            messageOwner: "Бот",
            messageType: "text",
            messageText: `Менеджер ${managerName} ${managerSurname} вже завершив цей чат. Переходьте до іншого`,
            createdAt: Date.now(),
          },
        };

        dispatch({
          type: addMessage,
          payload: messageData,
        });
      }
    });

    return () => {
      socket.off("closeChatByUser");
    };
  }, [dispatch, manager.id]);

  // handle to close chat by manager
  const handleFinishChat = () => {
    if (selectedChatRoom) {
      const { _id, userId } = selectedChatRoom;
      dispatch(closeChatRoom({ chatRoomId: _id, userId }));
    }

    setSelectedChatRoom(null);
    setIsOpenModal(false);
  };

  // handle to open modal window to approve of closing chat
  const handleOpenModal = () => setIsOpenModal(true);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <ChatsHeader unprocessedChatRooms={unprocessedChatRooms} />
      <section className="flex w-full indicators-hidden">
        {chatRoomsInProgress?.length > 0 && (
          <div className="chats-list">
            {chatRoomsInProgress?.map((room) => (
              <ChatRoomCard
                key={room._id}
                room={room}
                onConnectClick={() => handleConnectClick(room)}
                isSelected={
                  room._id === (selectedChatRoom ? selectedChatRoom._id : null)
                }
              />
            ))}
          </div>
        )}
        {!chatRoomsInProgress?.length && (
          <div className="chats-list justify-center items-center">
            <ChatListEmptyIcon />
            <p className="chatroom-empty-title">Активні діалоги відсутні</p>
          </div>
        )}
        {selectedChatRoom && (
          <div className="chatroom-style justify-between">
            <ChatRoomWithUser
              chatRoom={selectedChatRoom}
              isOpenModal={handleOpenModal}
            />
          </div>
        )}
        {!selectedChatRoom && (
          <div className="chatroom-style justify-center items-center">
            <ChatRoomEmptyIcon />
            <p className="chatroom-empty-title">
              Оберіть діалог зі списку, щоб почати спілкування
            </p>
          </div>
        )}
      </section>
      {isOpenModal && (
        <ModalWarning
          onFinishChat={handleFinishChat}
          closeModal={() => setIsOpenModal(false)}
        />
      )}
    </div>
  );
};
