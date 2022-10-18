import style from "./mypage_main.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

function MyPageMain() {
    const username = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체
    const navigate = useNavigate();

    const getUserInfo = async () => {
        console.log(username.state);
        await axios
            .get("/auth/info", {
                headers: {
                    username: username.state,
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const leftMenuClick = async () => {
        if (window.confirm("정말로 탈퇴 하시겠습니까?")) {
            await axios
                .delete("api/mypage/delete", {
                    data: {
                        username: username.state,
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

    const changePassword = () => {
        navigate("/mypage/changePassword", {
            state: username.state,
        });
    };

    useEffect(() => {
        getUserInfo();
    }, [username]);

    return (
        <div className={style.mainContainer}>
            <div className={style.leftMenu} onClick={leftMenuClick}>
                <div className={style.userName}>유저 이름:{username.state}</div>
                <div className={style.userEmail}>E-mail:{}</div>
            </div>
            <div className={style.changePW} onClick={changePassword}>
                비밀번호 변경
            </div>
        </div>
    );
}

export default MyPageMain;
