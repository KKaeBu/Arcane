import style from "./mypage_main.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import { tz } from "moment-timezone";

function MyPageMain() {
    const username = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체
    const navigate = useNavigate();
    moment.tz.setDefault("Asia/Seoul");

    const like_list_div = useRef(null);
    const signup_div = useRef(null);

    const [userEmail, setEmail] = useState("");
    const [signup_date, setDate] = useState("");
    const [liked_post, setLiked] = useState([{}]);
    const [write_post, setWrite] = useState([{}]);

    const getUserInfo = async () => {
        console.log(username.state);
        await axios
            .get("/auth/info", {
                headers: {
                    username: username.state,
                },
            })
            .then((res) => {
                setEmail(res.data.data.email);
                setLiked(res.data.data.postlike);
                setDate(res.data.data.signupDate);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    const showLikedPost = async () => {
        if (liked_post[0].title !== undefined) {
            for (let i = 0; i < liked_post.length; i++) {
                const new_liked_post = document.createElement("a");
                new_liked_post.setAttribute("class", style.userLikedLink);
                new_liked_post.innerHTML = liked_post[i].title;
                like_list_div.current.appendChild(new_liked_post);
            }
        }
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

    useEffect(() => {
        showLikedPost();
    }, [liked_post]);

    return (
        <>
            <div className={style.title}>내 정보</div>
            <div className={style.mainContainer}>
                <div className={style.leftMenu}>
                    <div className={style.info}>
                        <div className={style.userName}>{username.state}</div>
                        <div className={style.userEmail}>{userEmail}</div>
                        <div className={style.signupDate} ref={signup_div}>
                            가입날짜:
                            {moment(signup_date).format("YYYY-MM-DD HH:mm")}
                        </div>
                    </div>

                    <div className={style.userLiked}>좋아하는 글</div>
                    <div className={style.changePW} onClick={changePassword}>
                        비밀번호 변경
                    </div>
                </div>
                <div className={style.rightMenu}>
                    this is right menu
                    <div
                        className={style.likelist}
                        ref={like_list_div}
                        onClick={leftMenuClick}
                    ></div>
                </div>
            </div>
        </>
    );
}

export default MyPageMain;
