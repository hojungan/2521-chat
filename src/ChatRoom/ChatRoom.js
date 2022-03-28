import { useEffect, useRef, useState } from "react";
import ChatMessage from "../ChatMessage/ChatMessage";

import {
  Timestamp,
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy
} from "firebase/firestore";
import { signOut } from "firebase/auth";

function ChatRoom({ db, auth }) {
  const [messages, setMessages] = useState([]);

  const [textMsg, setTextMsg] = useState("");
  const dummy = useRef();

  useEffect(()=> {
    fetchMessages();
  },[])

  const fetchMessages = async () => {
    const q = query(collection(db, "messages"), orderBy("createdAt"));
    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach(doc => {
        msgs.push(doc.data())
      })
      setMessages(msgs);
    })
  }

  const sendMessage = async e => {
    e.preventDefault();

    const { uid, displayName } = auth.currentUser;
    const message = {
      text: textMsg,
      createdAt: Timestamp.fromDate(new Date()),
      uid,
      displayName
    }

    await addDoc(collection(db, "messages"), message);
    
    fetchMessages();


    // setMessages([...messages, message])
    setTextMsg("");
    // dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {messages &&
        messages.map((msg, ind) =>
          <ChatMessage key={ind} message={msg} auth={auth} />
        )}

      <div ref={dummy} />
      <div className="spacer" />

      <div className="chatMsgLogout">
        <form onSubmit={sendMessage} className="chat-form">
          <div className="form-group">
            <label htmlFor="">Chat: </label>
            <input
              type="text"
              value={textMsg}
              onChange={e => setTextMsg(e.target.value)}
              autoFocus
            />
          </div>
        </form>
        <button onClick={() => signOut(auth)} className="btn sm">
          Signout
        </button>
      </div>
    </>
  );
}

export default ChatRoom;
