import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "./socket";

import "./styles.css";
import { ChatRoomCard } from "./ChatRoomCard";
import { ChatWithClient } from "./ChatWithClient";
import {
  ChatRoomEmptyIcon,
  ChatListEmptyIcon,
  BellIcon,
} from "../../images/icons";

import { selectChatRooms } from "../../redux/chat/selectors";
import { selectToken, selectUser } from "../../redux/auth/selectors";
import {
  updateUserStatus,
  updateIsChatRoomOpen,
  createChatByUser,
  updateManager,
  disconnectManager,
  addMessage,
  closeChat,
} from "../../redux/chat/actions";
import {
  getChatRoomsInProgress,
  closeChatRoom,
} from "../../redux/chat/operations";

export const ChatRoomList = () => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);
  const storedToken = useSelector(selectToken);
  const chatRooms = useSelector(selectChatRooms);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  const chatRoomsInProgress = chatRooms?.filter(
    (room) => room.chatRoomStatus === "in progress"
  );

  const unprocessedChatRooms = chatRooms?.filter(
    (room) => !room.isChatRoomProcessed
  );

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

      if (isOnline === false) {
        dispatch({
          type: updateIsChatRoomOpen,
          payload: { userId, isChatRoomOpen: false },
        });
      }
    });

    return () => {
      socket.off("userStatusChanged");
    };
  }, [dispatch]);

  // update chat room and send message to manager when user rolling up a chat room or unfolds one
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

  // handle to close chat by manager
  const handleFinishChat = () => {
    if (selectedChatRoom) {
      const { _id, userId } = selectedChatRoom;
      dispatch(closeChatRoom({ chatRoomId: _id, userId }));
    }

    setSelectedChatRoom(null);
  };

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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <h6 className="font-sans font-400 text-textTertiary text-sm leading-5 mb-m">
        Чатбот / <span className="text-textPrimary">Чати з клієнтами</span>
      </h6>
      <div className="flex justify-between">
        <h1 className="font-sans font-500 text-textTertiary text-xl leading-6 mb-m">
          Чати з клієнтами
        </h1>
        <div className="relative">
          <BellIcon />
          {unprocessedChatRooms?.length > 0 && (
            <div
              className="absolute top-[0] right-[0] flex items-center justify-center 
                         w-xs h-xs font-400 text-[8px] text-iconContrast leading-4
                       bg-bgBrandDark rounded-[50%] 
                       "
            >
              <span>{unprocessedChatRooms.length} </span>
            </div>
          )}
        </div>
      </div>
      <section className="flex w-full indicators-hidden">
        {chatRoomsInProgress?.length > 0 && (
          <div className="flex flex-col w-[40%] border border-solid border-borderDefault rounded-tl-medium bg-bgWhite">
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
          <div className="flex flex-col w-[40%] border border-solid border-borderDefault rounded-tl-medium bg-bgWhite justify-center items-center">
            <ChatListEmptyIcon />
            <div className="font-sans font-500 text-xl leading-6 mt-xs text-center">
              Активні діалоги відсутні
            </div>
          </div>
        )}
        {selectedChatRoom && (
          <div className="flex flex-col w-[60%] border-t border-b border-r border-solid border-borderDefault rounded-tr-medium bg-bgWhite justify-between">
            <ChatWithClient
              chatRoom={selectedChatRoom}
              onFinishChat={handleFinishChat}
            />
          </div>
        )}
        {!selectedChatRoom && (
          <div className="flex flex-col w-[60%] border-t border-b border-r border-solid border-borderDefault rounded-tr-medium bg-bgWhite justify-center items-center">
            <ChatRoomEmptyIcon />
            <div className="font-sans font-500 text-xl leading-6 mt-xs text-center">
              Оберіть діалог зі списку, щоб почати спілкування
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
