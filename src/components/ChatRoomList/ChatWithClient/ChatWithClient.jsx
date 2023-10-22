import PropTypes from "prop-types";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../socket";

import { selectUser } from "../../../redux/auth/selectors";
import { updateManager } from "../../../redux/chat/actions";

export const ChatWithClient = ({
  chatRoom,
  onBackClick,
  isUserOnline,
  isChatOpen,
}) => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);

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

  return (
    <div>
      <div>{isUserOnline}</div>
      <div>{isChatOpen}</div>
      <button onClick={onBackClick}>Повернутися назад</button>
    </div>
  );
};

ChatWithClient.propTypes = {
  chatRoom: PropTypes.object.isRequired,
  onBackClick: PropTypes.func,
  isUserOnline: PropTypes.bool,
  isChatOpen: PropTypes.bool,
};
