import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn({ auth, db }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async e => {
    e.preventDefault();

    // check if username exists in collection
    const docRef = await getDoc(doc(db, "users", username));
    if (docRef.exists()) {
      // check password by sigining in with email and password
      try {
        await signInWithEmailAndPassword(auth, docRef.data().email, password);

        // setUser(auth.currentUser);
      } catch (err) {
        // setUser(null);
        setErrorMsg("Username or password is incorrect");
      }
    } else {
    }
  };

  return (
    <div className="signin">
      <p>로그인후 채팅방을 입장할수 있습니다</p>

      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label htmlFor="username">닉네임</label>
          <input
            type="username"
            name="username"
            id="username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-buttons">
          <button className="btn plain">로그인</button>
        </div>
      </form>

      <div className="register-link">
        <Link to="register">가입하기</Link>
      </div>
    </div>
  );
}

export default SignIn;
