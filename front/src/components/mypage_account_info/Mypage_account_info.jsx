import style from "./mypage_account_info.module.css";
import { useRef, useEffect } from "react";
import moment from "moment/moment";
// import { tz } from "moment-timezone";

function MyPageAccountInfo(props) {
    const signup_div = useRef(null);
    const info_div = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            info_div.current.classList.add(style.show);
        }, 100);
    }, []);

    return (
        <>
            <div className={style.info} ref={info_div}>
                <div className={style.infoLeft}>계정정보</div>
                <div className={style.infoRight}>
                    <div className={style.userName}>
                        <p className={style.userNameP}>ID</p>
                        {props.name}
                    </div>
                    <div className={style.userEmail}>
                        <p className={style.userEmailP}>E-mail</p>
                        {props.email}
                    </div>
                    <div className={style.signupDate} ref={signup_div}>
                        <p className={style.signupDateP}>가입날짜</p>
                        {moment(props.signup).format("YYYY-MM-DD HH:mm")}
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyPageAccountInfo;