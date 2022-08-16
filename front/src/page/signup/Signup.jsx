import style from "./signup.module.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Signup() {
    const [inputID, setID] = useState("");
    const [inputEmail, setEmail] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [inputPasswordAgain, setPasswordAgain] = useState("");

    // 아래 change함수들은 input값의 변화를 감지하고 변화된 값을 set함수를 통해 저장함
    const changeID = () => {
        const ID = document.getElementById("id");
        setID(ID.value);
    };
    const changeEmail = () => {
        const Email = document.getElementById("email");
        setEmail(Email.value);
    };
    const changePassword = () => {
        const Password = document.getElementById("password");
        setPassword(Password.value);
    };
    const changePasswordAgain = () => {
        const PasswordAgain = document.getElementById("passwordAgain");
        setPasswordAgain(PasswordAgain.value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (inputPassword !== inputPasswordAgain) {
            alert("비밀번호가 다릅니다!");
        } else if (
            inputID === "" ||
            inputEmail === "" ||
            inputPassword === "" ||
            inputPasswordAgain === ""
        ) {
            alert("빈칸을 모두 채워주세요!");
        } else {
            await axios
                .post("/signup", {
                    id: inputID,
                    password: inputPassword,
                    email: inputEmail,
                })
                .then((res) => {
                    alert("회원가입에 성공했습니다!");
                    console.log(res.data);
                    window.location.replace("/login");
                })
                .catch((e) => {
                    console.error(e);
                });
        }
    };
    return (
        <div className={style.login}>
            <div className={style.loginWrapper}>
                <div className={style.loginLeft}>
                    <h3 className={style.loginLogo}>Arcane Project</h3>
                    <span className={style.loginDesc}>
                        Arcane Project에 로그인하고<br></br>
                        모든 기능을 이용해보세요.
                    </span>
                </div>
                <div className={style.loginRight}>
                    <form className={style.loginBox} onSubmit={onSubmit}>
                        <input
                            placeholder="아이디"
                            className={style.logoinInput}
                            id="id"
                            onChange={changeID}
                        />
                        <input
                            placeholder="이메일"
                            className={style.logoinInput}
                            id="email"
                            onChange={changeEmail}
                        />
                        <input
                            placeholder="비밀번호"
                            className={style.logoinInput}
                            id="password"
                            onChange={changePassword}
                        />
                        <input
                            placeholder="비밀번호 확인"
                            className={style.logoinInput}
                            id="passwordAgain"
                            onChange={changePasswordAgain}
                        />
                        <button className={style.loginButton}>Sign Up</button>
                        {/* <button className={style.loginRegisterButton}>
                            Log into Account
                        </button>  */}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
