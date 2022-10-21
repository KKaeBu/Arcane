import { Link, useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import style from "./signup_main.module.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import TokenStorage from "../../db/token";

function SignupMain() {
    const navigate = useNavigate();

    const [inputUsername, setUsername] = useState("");
    const [inputEmail, setEmail] = useState("");
    const [inputPassword, setPassword] = useState("");
    const [inputPasswordAgain, setPasswordAgain] = useState("");

    const [isExist, setExist] = useState(false);

    const showPassword = useRef(null);
    const inputPasswordDiv = useRef(null);
    const signupWrapper = useRef(null);

    const token = new TokenStorage();

    // 아래 change함수들은 input값의 변화를 감지하고 변화된 값을 set함수를 통해 저장함
    const changeUsername = async (e) => {
        const Username = document.getElementById("username");
        await setUsername(Username.value);
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
            alert("입력한 비밀번호가 일치하지 않습니다");
        } else if (
            inputUsername === "" ||
            inputEmail === "" ||
            inputPassword === "" ||
            inputPasswordAgain === ""
        ) {
            alert("빈칸을 모두 채워주세요");
        } else {
            await axios
                .post("/auth/signup", {
                    username: inputUsername,
                    password: inputPassword,
                    email: inputEmail,
                })
                .then((res) => {
                    alert("회원가입에 성공했습니다!");
                    navigate("/");
                })
                .catch((e) => {
                    console.error(e);
                    window.alert(e.response.data.message);
                });
        }
    };

    useEffect(() => {
        axios
            .get("/auth/exist", {
                headers: {
                    username: inputUsername,
                },
            })
            .then((res) => {
                console.log(res.data.data);
                setExist(res.data.data);
            })
            .catch((e) => {
                console.error(e);
            });
    }, [inputUsername]);

    useEffect(() => {
        setTimeout(() => {
            signupWrapper.current.classList.add(style.start);
        }, 1);
    }, []);

    return (
        <div className={style.signup}>
            <div className={style.signupWrapper} ref={signupWrapper}>
                <div className={style.signupTop}>
                    <h3 className={style.signupLogo}>Arcane</h3>
                    <span className={style.signupDesc}>
                        Arcane에 로그인하면 모든 서비스를 이용할 수 있습니다.
                    </span>
                </div>
                <div className={style.signupBottom}>
                    <form className={style.signupBox} onSubmit={onSubmit}>
                        <input
                            placeholder="아이디 (최대 10자)"
                            className={style.signupInput}
                            id="username"
                            onChange={changeUsername}
                            maxLength={10}
                        />
                        <div className={style.isPossible}>
                            {inputUsername === ""
                                ? "아이디를 입력해주세요."
                                : isExist
                                ? "이미 존재하는 아이디입니다."
                                : "사용가능한 아이디입니다."}
                        </div>
                        <input
                            placeholder="이메일"
                            className={style.signupInput}
                            id="email"
                            onChange={changeEmail}
                        />
                        <input
                            placeholder="비밀번호"
                            className={style.signupInput}
                            id="password"
                            onChange={changePassword}
                        />
                        <div className={style.signupInput}>
                            <input
                                type="password"
                                placeholder="비밀번호 확인"
                                className={style.signupInputDiv}
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

                        <button className={style.signupButton}>Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignupMain;
