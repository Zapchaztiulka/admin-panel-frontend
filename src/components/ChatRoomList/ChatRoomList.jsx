import io from "socket.io-client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ChatRoom } from "./ChatRoom";
import { selectChatRooms } from "../../redux/chat/selectors";
import { updateUserStatus } from "../../redux/chat/actions";
import { getChatRoomsInProgress } from "../../redux/chat/operations";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const ChatRoomList = () => {
  const dispatch = useDispatch();
  const chatRoomsInProgress = useSelector(selectChatRooms);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  const sortedChatRooms = chatRoomsInProgress.toSorted(
    (a, b) => b.isOnline - a.isOnline
  );

  // fetch all chat rooms with status 'in progress'
  useEffect(() => {
    dispatch(getChatRoomsInProgress());
  }, [dispatch]);

  // update chat rooms when user enters in chat or close it
  useEffect(() => {
    const socket = io.connect(BACKEND_URL);

    socket.on("userStatusChanged", ({ userId, isOnline }) => {
      dispatch(getChatRoomsInProgress());
      dispatch(updateUserStatus(userId, isOnline));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  const handleConnectClick = (chatRoom) => {
    setSelectedChatRoom(chatRoom);
  };

  return (
    <div className="flex flex-col gap-5 py-10">
      {sortedChatRooms &&
        sortedChatRooms.map((room) => (
          <ChatRoom
            key={room._id}
            room={room}
            onConnectClick={() => handleConnectClick(room)}
          />
        ))}
      {selectedChatRoom && <div>{/* чат з клієнтом буде тут */}</div>}
    </div>
  );
};
