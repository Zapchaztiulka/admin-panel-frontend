import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "./socket";

import { ChatRoomCard } from "./ChatRoomCard";
import { ChatWithClient } from "./ChatWithClient";
import { selectChatRooms } from "../../redux/chat/selectors";
import { selectToken } from "../../redux/auth/selectors";
import {
  updateUserStatus,
  updateIsChatRoomOpen,
  createChatByUser,
  addMessage,
} from "../../redux/chat/actions";
import { getChatRoomsInProgress } from "../../redux/chat/operations";

export const ChatRoomList = () => {
  const dispatch = useDispatch();
  const storedToken = useSelector(selectToken);
  const chatRoomsInProgress = useSelector(selectChatRooms);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  const sortedChatRooms = chatRoomsInProgress?.toSorted(
    (a, b) => b.isOnline - a.isOnline
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
      ({ room, isOnline, username, userSurname }) => {
        dispatch({
          type: createChatByUser,
          payload: { room, isOnline, username, userSurname },
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

  const handleConnectClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  const handleBackClick = () => {
    setSelectedChatRoom(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen">
      <h6 className="font-sans font-400 text-textTertiary text-sm leading-5 mb-m">
        Чатбот / <span className="text-textPrimary">Чати з клієнтами</span>
      </h6>
      <h1 className="font-sans font-500 text-textTertiary text-xl leading-6 mb-m">
        Чати з клієнтами
      </h1>
      <section className="flex w-full h-5/6">
        <div></div>
        <div className="flex flex-col w-1/3 p-xs border border-solid border-borderDefault rounded-medium bg-bgWhite">
          {sortedChatRooms &&
            sortedChatRooms.map((room) => (
              <ChatRoomCard
                key={room._id}
                room={room}
                onConnectClick={() => handleConnectClick(room)}
              />
            ))}
        </div>
        <div className="flex flex-col w-2/3 p-xs border border-solid border-borderDefault bg-bgWhite justify-between">
          {selectedChatRoom && (
            <ChatWithClient
              chatRoom={selectedChatRoom}
              onBackClick={handleBackClick}
            />
          )}
        </div>
      </section>
    </div>
  );
};
