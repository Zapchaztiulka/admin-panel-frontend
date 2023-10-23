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
} from "../../redux/chat/actions";
import { getChatRoomsInProgress } from "../../redux/chat/operations";

export const ChatRoomList = () => {
  const dispatch = useDispatch();
  const storedToken = useSelector(selectToken);
  const chatRoomsInProgress = useSelector(selectChatRooms);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [isUserOnline, setIsUserOnline] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  // update chat room when user enters in chat or close one
  useEffect(() => {
    socket.on("userStatusChanged", ({ userId, isOnline, serverMessage }) => {
      setIsUserOnline(serverMessage);
      dispatch(getChatRoomsInProgress());
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

  // update chat room when user rolling up a chat room or unfolds one
  useEffect(() => {
    socket.on(
      "chatRoomOpenChanged",
      ({ userId, isChatRoomOpen, serverMessage }) => {
        setIsChatOpen(serverMessage);
        dispatch(getChatRoomsInProgress());
        dispatch({
          type: updateIsChatRoomOpen,
          payload: { userId, isChatRoomOpen },
        });
      }
    );

    return () => {
      socket.off("chatRoomOpenChanged");
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
    <div className="flex flex-col gap-m py-xs2">
      {!selectedChatRoom &&
        sortedChatRooms &&
        sortedChatRooms.map((room) => (
          <ChatRoomCard
            key={room._id}
            room={room}
            onConnectClick={() => handleConnectClick(room)}
          />
        ))}
      {selectedChatRoom && (
        <ChatWithClient
          chatRoom={selectedChatRoom}
          onBackClick={handleBackClick}
          isUserOnline={isUserOnline}
          isChatOpen={isChatOpen}
        />
      )}
    </div>
  );
};
