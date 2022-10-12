import { Link } from "react-router-dom";
import { Home } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import style from "./signup.module.css";
import { useRef, useState } from "react";
import axios from "axios";
import TokenStorage from "../../db/token";

function Signup() {
    const [inputUsername, setUsername] = useState("");
    const [inputEmail, setEmail] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [inputPasswordAgain, setPasswordAgain] = useState("");

    const showPassword = useRef(null);
    const inputPasswordDiv = useRef(null);

    const token = new TokenStorage();

    // 아래 change함수들은 input값의 변화를 감지하고 변화된 값을 set함수를 통해 저장함
    const changeUsername = () => {
        const Username = document.getElementById("username");
        setUsername(Username.value);
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
    const ChangePasswordShow = () => {
        if (showPassword.current.getAttribute("opacity")) {
            showPassword.current.removeAttribute("opacity");
            inputPasswordDiv.current.setAttribute("type", "text");
        } else {
            showPassword.current.setAttribute("opacity", 0.5);
            inputPasswordDiv.current.setAttribute("type", "password");
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (inputPassword !== inputPasswordAgain) {
            alert("비밀번호가 다릅니다!");
        } else if (
            inputUsername === "" ||
            inputEmail === "" ||
            inputPassword === "" ||
            inputPasswordAgain === ""
        ) {
            alert("빈칸을 모두 채워주세요!");
        } else {
            await axios
                .post("/auth/signup", {
                    username: inputUsername,
                    password: inputPassword,
                    email: inputEmail,
                })
                .then((res) => {
                    alert("회원가입에 성공했습니다!");
                    console.log(res.data.token);
                    // token.saveToken(res.data.token);
                    // window.location.replace("/login");
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
                            placeholder="아이디 (최대 10자)"
                            className={style.loginInput}
                            id="username"
                            onChange={changeUsername}
                            maxLength={10}
                        />
                        <input
                            placeholder="이메일"
                            className={style.loginInput}
                            id="email"
                            onChange={changeEmail}
                        />
                        <input
                            placeholder="비밀번호"
                            className={style.loginInput}
                            id="password"
                            onChange={changePassword}
                        />
                        <div className={style.loginInput}>
                            <input
                                type="password"
                                placeholder="비밀번호 확인"
                                className={style.loginInputDiv}
                                id="passwordAgain"
                                onChange={changePasswordAgain}
                                ref={inputPasswordDiv}
                            />
                            <VisibilityIcon
                                className={style.viewIcon}
                                ref={showPassword}
                                onClick={ChangePasswordShow}
                                opacity="0.5"
                            />
                        </div>

                        <button className={style.loginButton}>Sign Up</button>

                        <Link to="/login" className={style.loginRegisterButton}>
                            Log into Account
                        </Link>

                        {/* <button className={style.loginRegisterButton}>
                            Log into Account
                        </button>  */}
                    </form>
                </div>

                <Link to="/" className={style.homeIconWrapper}>
                    <Home className={style.homeIcon} />
                </Link>
            </div>
        </div>
    );
}

export default Signup;
