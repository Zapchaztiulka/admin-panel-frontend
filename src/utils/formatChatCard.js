export const cutFullName = (username, userSurname, chatNumber) => {
  let cuttingUsername = null;

  const fullName = username + " " + userSurname;
  if (fullName.length > 15) {
    cuttingUsername = (username + " " + userSurname).slice(0, 15) + " ...";
  } else if (!username) {
    cuttingUsername = `Гість ${chatNumber}`;
  } else cuttingUsername = fullName;

  return cuttingUsername;
};

export const getLastClientMessage = (messages) => {
  let lastClientMessage = { messageText: null, waitingTime: null };

  if (messages.length > 0) {
    const lastMessageOwner = messages[messages.length - 1].messageOwner;

    const reversedMessages = [...messages].reverse();
    const lastMessage = reversedMessages.find(
      (message) => message.messageOwner === "user"
    );

    if (lastMessage) {
      lastClientMessage.messageText =
        lastMessage.messageText.slice(0, 20) + " ...";
      if (lastMessageOwner === "user") {
        const waitingTime = Math.floor(
          (new Date() - new Date(lastMessage.createdAt).getTime()) / 1000 / 60
        );
        if (waitingTime >= 1) {
          lastClientMessage.waitingTime = waitingTime;
        } else lastClientMessage.waitingTime = "< 1";
      }
    }
  }

  return lastClientMessage;
};

export const getUnreadClientMessages = (messages) => {
  let lastIndex = messages.length - 1;

  if (lastIndex < 0 || messages[lastIndex].messageOwner !== "user") {
    return null;
  }

  let count = 0;
  while (lastIndex >= 0 && messages[lastIndex].messageOwner === "user") {
    count++;
    lastIndex--;
  }

  return count;
};
