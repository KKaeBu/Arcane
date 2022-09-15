import style from "./read.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import TokenStorage from "../../db/token";

function Read(props) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [view, setView] = useState(0);
    const [username, setName] = useState("");
    const [user_id, setID] = useState("");
    const [like, setLike] = useState(0);
    const id = useLocation(); //navigate의 option값으로 받아온 유저 id를 담은 객체

    const findWriter = async () => {
        console.log("state:", id.state);
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
                setTitle(res.data.title);
                setLike(res.data.Like);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const listbutton = () => {
        props.propFunction(false);
    };

    useEffect(() => {
        findWriter();
    }, []);

    return (
        <>
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
                <div className={style.commenttitle}>3 comments</div>
                <div className={style.comments}>
                    <span className={style.commentusername}>UserName</span>
                    <span className={style.commentcontent}>
                        React Hook useEffect has a missing dependency
                    </span>
                </div>
                <div className={style.comments}>
                    <span className={style.commentusername}>ysh038</span>
                    <span className={style.commentcontent}>comment test</span>
                </div>
                <div className={style.comments}>
                    <span className={style.commentusername}>skvnkn123</span>
                    <span className={style.commentcontent}>
                        댓글 테스트 입니다.
                    </span>
                </div>
            </div>
            <div className={style.listbutton} onClick={listbutton}>
                새로고침하면 메인화면 가지길래 이거 <br></br> 누르면 목록으로
                돌아감 (여기 버튼말고 목록을 그냥 보여줄 수도 있을듯)
            </div>
        </>
    );
}

export default Read;
