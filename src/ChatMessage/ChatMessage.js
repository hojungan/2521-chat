function ChatMessage({ message, auth }) {
  const { text, uid, displayName } = message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className="message">
      <div className={`name ${messageClass}`}>
        <p>
          {displayName}
        </p>
      </div>
      <div className="chatMessage">
        <p>
          {text}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage;
