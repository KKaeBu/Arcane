import style from "./mypage_account_info.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { tz } from "moment-timezone";

function MyPageAccountInfo(props) {
    const signup_div = useRef(null);

    return (
        <>
            <div className={style.info}>
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
