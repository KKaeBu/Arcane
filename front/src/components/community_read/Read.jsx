import style from "./read.module.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import TokenStorage from "../../db/token";
import { useRef } from "react";

function Read(props) {
    const [login_user, setLoginuserName] = useState("");
    const [islogin, setLogin] = useState(false);
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [view, setView] = useState(0);
    const [username, setName] = useState("");
    const [user_id, setID] = useState("");
    const [like, setLike] = useState(0);
    const [new_comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    // const commentWrapper = document.querySelector(
    //     "." + style["commenttitle"]
    // );
    const commentWrapper = useRef(null);

    const findWriter = async () => {
        await setID(props.id);
        await axios
            .get("/post", {
                headers: {
                    _id: props.id,
                },
            })
            .then((res) => {
                setName(res.data.username);
                setView(res.data.view);
                setText(res.data.content);
                setTitle(res.data.title);
                setLike(res.data.Like);
                setComments(res.data.comment);
                for (let i = 0; i < res.data.comment.length; i++) {
                    const commentDiv = document.createElement("div");
                    commentDiv.setAttribute("class", style.comments);
                    const commentUserName = document.createElement("span");
                    commentUserName.setAttribute(
                        "class",
                        style.commentusername
                    );
                    commentUserName.innerText = res.data.comment[i].username;
                    const commentContent = document.createElement("span");
                    commentContent.setAttribute("class", style.commentcontent);
                    commentContent.innerText = res.data.comment[i].content;

                    commentDiv.appendChild(commentUserName);
                    commentDiv.appendChild(commentContent);
                    commentWrapper.current.appendChild(commentDiv);
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
        } else {
            await axios
                .post("/post/comment", {
                    username: login_user,
                    content: new_comment,
                    _id: props.id,
                })
                .then((res) => {
                    alert("완료");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
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
                setLoginuserName(res.data.username);
                setLogin(true);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        isValidToken();
    }, []);

    useEffect(() => {
        findWriter();
    }, []);

    return (
        <div className={style.readWrapper}>
            <div className={style.read}>
                <div className={style.titleBar}>{title}</div>
                <div className={style.username}>{username}</div>
                <div className={style.view}>{view} views</div>
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
                    {like} people likes(하트모양 이모티콘)
                </div>
            </div>
            <div className={style.comment}>
                <div className={style.commenttitle} ref={commentWrapper}>
                    {comments.length}comments
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
                    <input type="text" onChange={writeComment} />
                    <div
                        className={style.submitCommentButton}
                        onClick={submitComment}
                    >
                        댓글 작성
                    </div>
                </div>
            </div>
            <div className={style.listbutton} onClick={listbutton}>
                새로고침하면 메인화면 가지길래 이거 <br></br> 누르면 목록으로
                돌아감 (여기 버튼말고 목록을 그냥 보여줄 수도 있을듯)
            </div>
        </div>
    );
}

export default Read;
