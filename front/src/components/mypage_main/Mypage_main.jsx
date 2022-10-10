import style from "./mypage_main.module.css";
import { useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

function MyPageMain() {
    const id = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체

    const deleteAccount = async () => {
        await axios
            .delete("/mypage/delete", {
                data: {
                    username: id.state,
                },
            })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    return (
        <>
            <div onClick={deleteAccount}>{id.state} 회원 탈퇴</div>
        </>
    );
}

export default MyPageMain;
