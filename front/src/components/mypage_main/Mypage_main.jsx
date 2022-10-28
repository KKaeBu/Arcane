import style from "./mypage_main.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
// import { tz } from "moment-timezone";
import MyPageLikePost from "../mypage_like_post/Mypage_like_post";
import MyPageAccountInfo from "../mypage_account_info/Mypage_account_info";

function MyPageMain() {
    const username = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체
    const navigate = useNavigate();
    moment.tz.setDefault("Asia/Seoul");

    const [userEmail, setEmail] = useState("");
    const [signup_date, setDate] = useState("");
    const [liked_post, setLiked] = useState([{}]);
    // const [write_post, setWrite] = useState([{}]);
    const [isLikeComponent, setLikeComponent] = useState(false);
    const [isAccountInfoComponent, setAccountComponent] = useState(false);

    const getUserInfo = async () => {
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
                console.error(e);
            });
    };

    const deleteAccount = async () => {
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

    const likeClick = () => {
        setAccountComponent(false);
        setLikeComponent(true);
    };

    const accountClick = () => {
        setAccountComponent(true);
        setLikeComponent(false);
    };

    const changePassword = () => {
        navigate("/mypage/changePassword", {
            state: username.state,
        });
    };

    useEffect(() => {
        getUserInfo();
    }, [username]);

    // useEffect(() => {
    //     showLikedPost();
    // }, [liked_post]);

    return (
        <>
            <div className={style.title}>내 정보</div>
            <div className={style.mainContainer}>
                <div className={style.leftMenu}>
                    <div className={style.accountInfo} onClick={accountClick}>
                        계정 정보
                    </div>
                    <div className={style.userLiked} onClick={likeClick}>
                        좋아하는 글
                    </div>
                    <div className={style.changePW} onClick={changePassword}>
                        비밀번호 변경
                    </div>
                    <div
                        className={style.deleteAccount}
                        onClick={deleteAccount}
                    >
                        계정 삭제
                    </div>
                </div>
                <div className={style.rightMenu}>
                    {isAccountInfoComponent ? (
                        <MyPageAccountInfo
                            name={username.state}
                            email={userEmail}
                            signup={signup_date}
                        />
                    ) : isLikeComponent ? (
                        <MyPageLikePost data={liked_post} />
                    ) : (
                        <div>Click the Menu</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default MyPageMain;
