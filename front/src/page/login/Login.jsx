import { Link } from "react-router-dom";
import style from "./login.module.css";

function Login() {
    const onClick = () => {

    }

    return (
        <div className={style.login}>
            <div className={style.loginWrapper}>
                <div className={style.loginLeft}>
                    <h3 className={style.loginLogo}>Arcane Project</h3>
                    <span className={style.loginDesc}>
                        Connect with friends and the world around you Arcane.
                    </span>
                </div>
                <div className={style.loginRight}>
                    <div className={style.loginBox}>
                        <input placeholder="아이디" type="Email" className={style.logoinInput} />
                        <input placeholder="비밀번호" type="Password" className={style.logoinInput} />
                        <button className={style.loginButton}>Log In</button>
                        <span className={style.loginForgot}>Forgot Password?</span>
                        <Link to="/signup" className={style.loginRegisterButton} onClick={onClick}>Create a New Account</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;