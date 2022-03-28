import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";

function Register({ db, auth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [registered, setRegistered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async e => {
    e.preventDefault();

    // check if the username already exists
    const docRef = await getDoc(doc(db, "users", username));

    if (!docRef.exists()) {
      // check if the email already exists
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", username), {
          username,
          email,
          uid: auth.currentUser.uid
        });
        await updateProfile(auth.currentUser, { displayName: username });
        setRegistered(true);
        setErrorMsg("");
      } catch (err) {
        setRegistered(false);
        setErrorMsg("email already exist");
      }
    } else {
      setRegistered(false);
      setErrorMsg("username already exist");
    }
  };

  return (
    <main>
      {!registered &&
        errorMsg &&
        <p>
          {errorMsg}
        </p>}
      {registered
        ? <div className="success-msg">
            <p>
              {username}님 가입을 축하합니다
            </p>
            <p>
              <Link to="/">로그인 하기</Link>
            </p>
          </div>
        : <div className="register">
            <p>가입후 채팅을 즐기세요</p>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label htmlFor="username">닉네임</label>
                <input
                  type="text"
                  id="username"
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={e => setEmail(e.target.value)}
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
                <button className="btn plain">가입하기</button>
              </div>
            </form>
            <Link to="/">로그인</Link>
          </div>}
    </main>
  );
}

export default Register;
