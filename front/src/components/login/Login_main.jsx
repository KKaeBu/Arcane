import { useRef, useState, useEffect } from "react";
import style from "./login_main.module.css";
import axios from "axios";
import TokenStorage from "../../db/token";
import { useNavigate } from "react-router-dom";

function LoginMain() {
    const navigate = useNavigate();
    const [inputUsername, setUsername] = useState("");
    const [inputPassword, setPassword] = useState("");

    const pw_box = useRef(null);
    const pw_input = useRef(null);
    const loginWrapper = useRef(null);

    const token = new TokenStorage();

    const changeUsername = () => {
        const username = document.getElementById("username");
        setUsername(username.value);
    };

    const changePassword = () => {
        const password = document.getElementById("password");
        setPassword(password.value);
    };

    const onSubmitID = async (event) => {
        event.preventDefault();

        if (inputUsername === "") {
        } else {
            pw_box.current.classList.add(style.visible);
            pw_input.current.classList.add(style.visible);
        }
    };
    const onSubmitPW = async (event) => {
        event.preventDefault();

        if (inputUsername === "" || inputPassword === "") {
        } else {
            await axios
                .get("/auth/login", {
                    params: {
                        username: inputUsername,
                        password: inputPassword,
                    },
                }) //
                .then((res) => {
                    token.saveToken(res.data.token);
                    window.location.replace("/");
                })
                .catch((err) => {
                    console.log(err);
                    if (err.response.status === 401) {
                        alert("아이디(비밀번호)가 틀렸습니다");
                    } else {
                        alert("로그인에 실패했습니다.");
                    }
                });
        }
    };

    const toSignUp = () => {
        navigate("/signup");
    };

    useEffect(() => {
        setTimeout(() => {
            loginWrapper.current.classList.add(style.start);
        }, 1);
    }, []);
    return (
        <div className={style.login}>
            <div className={style.loginWrapper} ref={loginWrapper}>
                <div className={style.loginTop}>
                    <h3 className={style.loginLogo}>Arcane에 로그인하세요</h3>
                </div>
                <div className={style.loginBottom}>
                    <form className={style.loginBoxID} onSubmit={onSubmitID}>
                        <input
                            placeholder="아이디"
                            className={style.loginInputID}
                            onChange={changeUsername}
                            id="username"
                        />
                    </form>
                    <form
                        className={style.loginBoxPW}
                        onSubmit={onSubmitPW}
                        ref={pw_box}
                    >
                        <input
                            placeholder="암호"
                            type="Password"
                            className={style.loginInputPW}
                            onChange={changePassword}
                            id="password"
                            ref={pw_input}
                        />
                    </form>
                </div>
                <div className={style.accountDiv}>
                    <p className={style.loginForgot}>
                        Arcane ID 또는 암호를 잊어버리셨습니까?
                    </p>
                    <div className={style.loginRegister}>
                        Arcane ID가 없으십니까?{" "}
                        <span className={style.singupLink} onClick={toSignUp}>
                            지금만드세요.
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginMain;
