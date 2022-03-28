import "./App.css";

import { useAuthState } from "react-firebase-hooks/auth";

import ChatRoom from "./ChatRoom/ChatRoom";
import SignIn from "./SignIn/SignIn";

function App({ db, auth }) {
  const [user] = useAuthState(auth);
  // const [user, setUser] = useState(auth.currentUser);
  // const user = auth.currentUser;

  return (
    <main>
      {user
        ? <div className="chat-window">
            <ChatRoom db={db} auth={auth} />
          </div>
        : <SignIn auth={auth} db={db} />}
    </main>
  );
}

export default App;
