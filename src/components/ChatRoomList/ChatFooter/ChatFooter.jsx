import PropTypes from "prop-types";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "../socket";

import "./styles.css";
import { MenuIcon, AttachIcon, SendIcon } from "../../../images/icons";
import { DestructiveBtn, PrimaryBtn } from "../../Buttons";
import { Loader } from "../../Loader";
import { sendFile } from "../../../redux/chat/operations";
import { selectActiveChatRoom } from "../../../redux/chat/selectors";
import { selectUser } from "../../../redux/auth/selectors";
import { addMessage } from "../../../redux/chat/actions";

export const ChatFooter = ({ chatRoom, onFinishChat, onStartChat }) => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);
  const activeChatRoom = useSelector((state) =>
    selectActiveChatRoom(state, chatRoom._id)
  );
  const { isChatRoomProcessed, chatRoomStatus } = activeChatRoom;

  const [activeMenu, setActiveMenu] = useState(true);
  const [message, setMessage] = useState("");
  const [rows, setRows] = useState(1);
  const rowsRef = useRef(rows);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [temporaryImageURL, setTemporaryImageURL] = useState(null);
  const [isSendingFile, setIsSendingFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // handle input with auto extending of input field
  const handleMessageChange = (evt) => {
    const textarea = evt.target;
    const minRows = 1;
    const maxRows = 4;

    setMessage(textarea.value);

    const currentRows = Math.min(
      maxRows,
      Math.max(minRows, textarea.scrollHeight / 24)
    );

    setRows(currentRows);
    rowsRef.current = currentRows;
  };

  // handle a text message
  const handleSubmitMessage = () => {
    if (message.trim() === "") return;

    const { _id, userId } = activeChatRoom;
    const messageData = {
      userId,
      roomId: _id,
      message: {
        messageOwner: manager.role,
        messageType: "text",
        messageText: message,
      },
    };

    dispatch({
      type: addMessage,
      payload: messageData,
    });

    socket.emit("managerMessage", messageData);

    setMessage("");
    setRows(1);
  };

  // send file to some Uploader for uploading and handle received data for rendering
  const sendFileToServer = () => {
    if (selectedFile) {
      setIsLoading(true);
      setIsSendingFile(true);
      const formData = new FormData();
      formData.append("chatImageURL", selectedFile);
      sendFile(formData)
        .then((data) => {
          const { _id, userId } = activeChatRoom;

          const messageData = {
            userId,
            roomId: _id,
            message: {
              messageOwner: manager.role,
              messageType: "image",
              messageText: data.imageURL,
            },
          };

          dispatch({
            type: addMessage,
            payload: messageData,
          });

          socket.emit("managerMessage", messageData);
        })
        .catch(() =>
          toast.error("Не вдалося завантажити фото. Спробуйте повторити")
        )
        .finally(() => {
          setSelectedFile(null);
          setFileSelected(false);
          setTemporaryImageURL(null);
          setIsLoading(false);
          setIsSendingFile(false);
        });
    }
  };

  // handle a previous view of image before uploading
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSelected(true);

    const tempURL = URL.createObjectURL(file);
    setTemporaryImageURL(tempURL);
  };

  // handle to open window to choose image-file for uploading
  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // return the rows of textarea to previous value
  const handleFocus = () => {
    if (message.trim() !== "") {
      setRows(rowsRef.current);
    }
  };

  // handle to send a message after pushing of button "Enter"
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (isSendingFile) {
        sendFileToServer();
      } else {
        handleSubmitMessage();
      }
    }
  };

  // handle changing of footer menu
  const toggleMenu = () => {
    setActiveMenu(!activeMenu);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <footer>
          {isChatRoomProcessed && chatRoomStatus === "in progress" && (
            <div className="relative items-center bg-bgWhite">
              <textarea
                className="input-style"
                type="text"
                placeholder="Введіть ваше повідомлення"
                rows={rows}
                value={message}
                onChange={handleMessageChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={() => setRows(1)} // return count of rows to initial value
              />

              {!message && !fileSelected && (
                <>
                  <button
                    type="button"
                    className="icon-style"
                    style={{ right: "44px" }}
                    onClick={toggleMenu}
                  >
                    <MenuIcon activeMenu={activeMenu} />
                  </button>
                  <button className="icon-style" onClick={openFileInput}>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      ref={fileInputRef}
                    />
                    <AttachIcon />
                  </button>
                </>
              )}
              {message && (
                <button
                  type="submit"
                  className="icon-style"
                  onClick={handleSubmitMessage}
                >
                  <SendIcon />
                </button>
              )}
              {fileSelected && (
                <button
                  type="submit"
                  className="icon-style"
                  onClick={sendFileToServer}
                >
                  <SendIcon />
                </button>
              )}
              {temporaryImageURL && (
                <div className="bg-bgWhite ml-sPlus py-sPlus">
                  <img src={temporaryImageURL} alt="Uploaded Image" />
                </div>
              )}
            </div>
          )}
          {activeMenu && chatRoomStatus === "in progress" && (
            <div className="flex gap-xs py-xs px-s fade-in">
              {!isChatRoomProcessed ? (
                <PrimaryBtn onClick={() => onStartChat()}>
                  Розпочати діалог
                </PrimaryBtn>
              ) : (
                <PrimaryBtn disabled>Розпочати діалог</PrimaryBtn>
              )}
              {isChatRoomProcessed ? (
                <DestructiveBtn to="/chatbot" onClick={() => onFinishChat()}>
                  Завершити діалог
                </DestructiveBtn>
              ) : (
                <DestructiveBtn disabled>Завершити діалог</DestructiveBtn>
              )}
            </div>
          )}
        </footer>
      )}
    </>
  );
};

ChatFooter.propTypes = {
  chatRoom: PropTypes.object.isRequired,
  onFinishChat: PropTypes.func.isRequired,
  onStartChat: PropTypes.func.isRequired,
};
