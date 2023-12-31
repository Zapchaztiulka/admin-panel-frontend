import PropTypes from "prop-types";
import { useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { socket } from "@/components/ChatsList/socket";

import "./styles.css";
import {
  MenuIcon,
  AttachIcon,
  SendIcon,
  CloseIcon,
} from "@/components/Icons/ChatIcons";
import { DestructiveBtn, PrimaryBtn } from "@/components/Buttons";
import { LoaderFooter } from "@/components/Loader";
import { compressAndResizeImage } from "@/utils";

import { addMessage } from "@/redux/chat/actions";
import {
  selectActiveChatRoom,
  selectSelectedRoomId,
} from "@/redux/chat/selectors";
import { selectUser } from "@/redux/auth/selectors";
import { sendFile } from "@/redux/chat/operations";

export const ChatRoomFooter = ({
  chatRoom,
  onStartChat,
  isOpenModal,
  disabled,
}) => {
  const dispatch = useDispatch();
  const manager = useSelector(selectUser);
  const activeChatRoom =
    useSelector((state) => selectActiveChatRoom(state, chatRoom?._id)) || {};
  const selectedRoom = useSelector(selectSelectedRoomId);
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
  const [handleTypingExecuted, setHandleTypingExecuted] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const fileInputRef = useRef(null);
  const isChatRoomInProgress =
    (isChatRoomProcessed && chatRoomStatus === "in progress") || false;

  // handle to send emit when manager is typing
  const handleTyping = useCallback(
    (isTyping) => {
      socket.emit("managerTyping", { isTyping, roomId: selectedRoom });
      setHandleTypingExecuted(isTyping);
    },
    [selectedRoom]
  );

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

    if (!handleTypingExecuted) {
      handleTyping(true);
    }

    // If the manager stops entering text, but cursor is in input field - we assume that he has stopped typing too
    clearTimeout(timeoutId);
    const delayedFunction = () => {
      handleTyping(false);
    };
    const id = setTimeout(delayedFunction, 3000);
    setTimeoutId(id);
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
    handleTyping(false); // if manager sent a message, we assume that he has stopped typing

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
          handleTyping(false); // if manager sent an image, we assume that he has stopped typing
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
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSelected(true);

    // compress and resize the image with a certain maximum width and a quality
    try {
      const compressedImage = await compressAndResizeImage(file, 250, 0.8);

      setTemporaryImageURL(compressedImage);
    } catch (error) {
      toast.error("Помилка завантаження фото. Будь-ласка повторіть спробу");
    }
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

  // handle to lost focus on input
  const handleOnBlur = () => {
    setRows(1); // return count of rows to initial value
    handleTyping(false);
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
    <footer className="relative">
      <div className="relative">
        <textarea
          className={`${
            isChatRoomInProgress
              ? "textarea-style"
              : "textarea-style-disabled border-y-1"
          } ${activeMenu ? "border-y-1" : "border-t-1"}`}
          type="text"
          placeholder="Введіть ваше повідомлення"
          rows={rows}
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleOnBlur}
          disabled={!isChatRoomInProgress}
        />
        {!message && !fileSelected && (
          <>
            <button
              type="button"
              className="icon-style"
              style={{ right: "44px" }}
              onClick={toggleMenu}
              disabled={!isChatRoomInProgress}
            >
              <MenuIcon
                activeMenu={activeMenu}
                isChatRoomInProgress={isChatRoomInProgress}
              />
            </button>
            <button
              className="icon-style"
              onClick={openFileInput}
              disabled={!isChatRoomInProgress}
            >
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
                ref={fileInputRef}
              />
              <AttachIcon isChatRoomInProgress={isChatRoomInProgress} />
            </button>
          </>
        )}
        {(fileSelected || message) && (
          <button
            type="submit"
            className="icon-style z-10"
            onClick={
              message && fileSelected
                ? () => {
                    handleSubmitMessage();
                    sendFileToServer();
                  }
                : message
                ? handleSubmitMessage
                : sendFileToServer
            }
          >
            <SendIcon />
          </button>
        )}
        {!isLoading && temporaryImageURL && (
          <div className="ml-s py-sPlus">
            <div className="relative">
              <img
                className="border-1 border-solid border-borderDefault rounded-minimal"
                src={temporaryImageURL}
                alt="Uploaded Image"
              />
              <button
                className="absolute top-[-8px] left-[242px] border-1 bg-bgWhite border-solid
                               border-borderDefault rounded-[50%] cursor-pointer hover:bg-bgHoverGrey
                               hover:border-borderHover transition-colors duration-300"
                onClick={() => {
                  setTemporaryImageURL(null);
                  setFileSelected(false);
                }}
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
      </div>
      {!isLoading ? (
        <>
          {activeMenu && isChatRoomProcessed && (
            <div className="flex gap-xs py-xs px-s fade-in">
              <PrimaryBtn disabled>Розпочати діалог</PrimaryBtn>
              <DestructiveBtn onClick={() => isOpenModal()} disabled={disabled}>
                Завершити діалог
              </DestructiveBtn>
            </div>
          )}
          {!isChatRoomProcessed && (
            <div className="flex gap-xs py-xs px-s fade-in">
              <PrimaryBtn onClick={() => onStartChat()} disabled={disabled}>
                Розпочати діалог
              </PrimaryBtn>
              <DestructiveBtn disabled>Завершити діалог</DestructiveBtn>
            </div>
          )}
        </>
      ) : (
        <LoaderFooter />
      )}
    </footer>
  );
};

ChatRoomFooter.propTypes = {
  chatRoom: PropTypes.object,
  onStartChat: PropTypes.func,
  isOpenModal: PropTypes.func,
  disabled: PropTypes.bool,
};
