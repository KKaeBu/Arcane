import style from "./read.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import TokenStorage from "../../db/token";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useRef } from "react";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

function Read(props) {
    const navigate = useNavigate();

    const [isliked, setisLiked] = useState(false);
    const [login_user_likedpost, setLoginLikedPost] = useState([]);
    const [login_user, setLoginuserName] = useState("");
    const [islogin, setLogin] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [view, setView] = useState(0);
    const [date, setDate] = useState("");
    const [username, setName] = useState("");
    const [user_id, setID] = useState("");
    const [like, setLike] = useState(0);
    const [new_comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    // const commentWrapper = document.querySelector(
    //     "." + style["commenttitle"]
    // );
    //const deleteDiv = document.querySelector("." + style["delete"]);
    const likeDiv = useRef(null);
    const deleteDiv = useRef(null);
    const commentWrapper = useRef(null);
    const correctDiv = useRef(null);
    const id = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체

    const findWriter = async () => {
        await setID(id.state);
        await axios
            .get("/post", {
                headers: {
                    _id: id.state,
                },
            })
            .then((res) => {
                setName(res.data.username);
                setView(res.data.view);
                setText(res.data.content);
                setDate(res.data.date);
                setTitle(res.data.title);
                setLike(res.data.Like);
                setComments(res.data.comment);
                if (username !== "" && login_user !== "") {
                    for (let i = 0; i < res.data.comment.length; i++) {
                        const commentDiv = document.createElement("div");
                        commentDiv.setAttribute("class", style.comments);
                        const commentUserName = document.createElement("span");
                        commentUserName.setAttribute(
                            "class",
                            style.commentusername
                        );
                        commentUserName.innerText =
                            res.data.comment[i].username;

                        const commentContent = document.createElement("span");
                        commentContent.setAttribute(
                            "class",
                            style.commentcontent
                        );
                        commentContent.innerText = res.data.comment[i].content;

                        if (login_user === res.data.comment[i].username) {
                            const commentDelete =
                                document.createElement("span");
                            commentDelete.setAttribute(
                                "class",
                                style.commentDelete
                            );
                            commentDelete.innerText = "댓글 지우기";
                            commentDelete.onclick = async () => {
                                await axios
                                    .delete("/post/comment/delete", {
                                        data: {
                                            _id: res.data.comment[i]._id,
                                            post_id: id.state,
                                        },
                                    })
                                    .then((res) => {
                                        window.location.reload();
                                    })
                                    .catch((e) => {
                                        console.error(e);
                                    });
                            };
                            commentDiv.appendChild(commentUserName);
                            commentDiv.appendChild(commentContent);
                            commentDiv.appendChild(commentDelete);
                        } else {
                            commentDiv.appendChild(commentUserName);
                            commentDiv.appendChild(commentContent);
                        }

                        commentWrapper.current.appendChild(commentDiv);
                    }
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const listbutton = () => {
        props.propFunction(false);
    };

    const writeComment = (e) => {
        setComment(e.target.value);
    };

    const submitComment = async (e) => {
        e.preventDefault();
        if (!islogin) {
            alert("로그인이 필요한 기능입니다.");
        } else if (new_comment === "") {
            alert("내용을 작성해주세요.");
        } else {
            await axios
                .post("/post/comment", {
                    username: login_user,
                    content: new_comment,
                    postid: id.state,
                })
                .then((res) => {
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const deletePost = async () => {
        await axios
            .delete("/post/delete", {
                data: {
                    _id: id.state,
                },
            })
            .then((res) => {
                window.location.replace(`http://localhost:3000/community`);
            })
            .catch((e) => {
                console.error(e);
            });
    };

    const likePost = async () => {
        if (islogin) {
            for (let i = 0; i < login_user_likedpost.length; i++) {
                if (login_user_likedpost[i]._id === id.state) {
                    await axios
                        .put("/post/like", {
                            _id: id.state,
                            like: like,
                            user: login_user,
                            isliked: isliked,
                        })
                        .then((res) => {
                            setLike(res.data.like);
                            setisLiked(res.data.isliked);
                            setLoginLikedPost(res.data.postlike);
                        })
                        .catch((e) => {
                            console.error(e);
                        });
                    return;
                }
            }
            await axios
                .put("/post/like", {
                    _id: id.state,
                    like: like,
                    user: login_user,
                    isliked: isliked,
                })
                .then((res) => {
                    setLike(res.data.like);
                    setisLiked(res.data.isliked);
                    setLoginLikedPost(res.data.postlike);
                })
                .catch((e) => {
                    console.error(e);
                });
        } else {
            alert("로그인이 필요한 서비스입니다.");
        }
    };

    const correctPost = async () => {
        navigate(`/community/correct/${id.state}`, {
            state: id.state,
        });
    };

    const isValidToken = async () => {
        const tokenStorage = new TokenStorage();
        const token = tokenStorage.getToken();

        await axios
            .get("/auth", {
                headers: {
                    token: token,
                },
            })
            .then((res) => {
                setLoginLikedPost(res.data.postlike);
                setLoginuserName(res.data.username);
                setLogin(true);
                if (login_user !== "" && username !== "") {
                    if (username === login_user) {
                        deleteDiv.current.removeAttribute("id");
                        correctDiv.current.removeAttribute("id");
                    }
                }
            })
            .catch((err) => console.error(err));

        for (let i = 0; i < login_user_likedpost.length; i++) {
            if (login_user_likedpost[i]._id === id.state) {
                setisLiked(true);
            } else {
                setisLiked(false);
            }
        }
    };

    useEffect(() => {
        isValidToken();
    }, [login_user, username]);

    useEffect(() => {
        findWriter();
    }, [username, login_user]);

    return (
        <div className={style.readWrapper}>
            <div className={style.read}>
                <div className={style.titleBar}>{title}</div>
                <div className={style.info}>
                    <div className={style.username}>{username}</div>
                    <div className={style.date}>
                        {moment(date).format("YYYY-MM-DD HH:mm")}
                    </div>
                    <div className={style.view}>조회 {view}</div>
                    <div className={style.commentInfo}>
                        댓글 {comments.length}
                    </div>
                </div>

                <div className={style.content}>
                    {/* \n이나 <br/>태그 등 줄바꿈을 작동하도록 함 */}
                    {text.split("\n").map((txt) => (
                        <>
                            {txt}
                            <br />
                        </>
                    ))}
                </div>

                <div className={style.like}>
                    <div className={style.iconBox}>
                        {isliked === true ? (
                            <Favorite
                                className={style.heart}
                                onClick={likePost}
                            />
                        ) : (
                            <FavoriteBorder
                                className={style.heart}
                                onClick={likePost}
                            />
                        )}
                    </div>
                    {like}
                </div>
            </div>
            <div
                className={style.delete}
                onClick={deletePost}
                id={style.invisible}
                ref={deleteDiv}
            >
                글 삭제
            </div>
            <div
                className={style.correct}
                onClick={correctPost}
                id={style.invisible}
                ref={correctDiv}
            >
                수정
            </div>

            <div className={style.comment}>
                <div className={style.commentmain} ref={commentWrapper}>
                    <p className={style.commenttitle}>
                        댓글 {comments.length}개
                    </p>
                </div>
                {/* 댓글 */}
                {/* <div className={style.comments}>
                    <span className={style.commentusername}>UserName</span>
                    <span className={style.commentcontent}>
                        React Hook useEffect has a missing dependency
                    </span>
                </div> */}
                {/* 댓글 */}
                <div className={style.newComment}>
                    <input
                        type="text"
                        onChange={writeComment}
                        className={style.writeComment}
                    />
                    <div
                        className={style.submitCommentButton}
                        onClick={submitComment}
                    >
                        댓글 작성
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;
