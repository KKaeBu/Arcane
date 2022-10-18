import style from "./mypage_main.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

function MyPageMain() {
    const id = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체
    const navigate = useNavigate();

    const deleteAccount = async () => {
        if (window.confirm("정말로 탈퇴 하시겠습니까?")) {
            await axios
                .delete("api/mypage/delete", {
                    data: {
                        username: id.state,
                    },
                })
                .then((res) => {
                    window.alert("탈퇴가 완료되었습니다.");
                    navigate(`/`);
                })
                .catch((e) => {
                    window.alert("오류 발생");
                    console.error(e);
                });
        }
    };

    return (
        <>
            <div onClick={deleteAccount}>{id.state} 회원 탈퇴</div>
        </>
    );
}

export default MyPageMain;