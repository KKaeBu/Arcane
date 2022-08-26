import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./login.module.css";
import axios from "axios";
import TokenStorage from "../../db/token";

function Login() {
    const [inputUsername, setUsername] = useState("");
    const [inputPassword, setPassword] = useState("");

    const token = new TokenStorage();

    const changeUsername = () => {
        const username = document.getElementById("username");
        setUsername(username.value);
    };

    const changePassword = () => {
        const password = document.getElementById("password");
        setPassword(password.value);
    };

    const onSubmit = async (event) => {
        event.preventDefault();

        if (inputUsername === "" || inputPassword === "") {
            alert("빈칸을 모두 채워주세요!");
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
                    window.location.href = "http://localhost:3000";
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

    return (
        <div className={style.login}>
            <div className={style.loginWrapper}>
                <div className={style.loginLeft}>
                    <h3 className={style.loginLogo}>Arcane Project</h3>
                    <span className={style.loginDesc}>
                        Arcane Project에 로그인하고<br></br>모든 기능을
                        이용해보세요.
                    </span>
                </div>
                <div className={style.loginRight}>
                    <form className={style.loginBox} onSubmit={onSubmit}>
                        <input
                            placeholder="아이디"
                            className={style.logoinInput}
                            id="username"
                            onChange={changeUsername}
                        />
                        <input
                            placeholder="비밀번호"
                            type="Password"
                            className={style.logoinInput}
                            id="password"
                            onChange={changePassword}
                        />
                        <button className={style.loginButton}>Log In</button>
                        <span className={style.loginForgot}>
                            Forgot Password?
                        </span>
                        <Link
                            to="/signup"
                            className={style.loginRegisterButton}
                        >
                            Create a New Account
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
