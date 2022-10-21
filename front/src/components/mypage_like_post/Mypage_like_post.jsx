import style from "./mypage_like_post.module.css";
import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyPageLikePost(props) {
    const navigate = useNavigate();

    const like_list_div = useRef(null);

    const [liked_post, setLiked] = useState([{}]);

    const showLikedPost = async () => {
        setLiked(props.data);
        if (props.data.length > 0) {
            for (let i = 0; i < props.data.length; i++) {
                const new_liked_post = document.createElement("p");
                new_liked_post.setAttribute("class", style.likePostLink);

                if (props.data[i].title.length > 20) {
                    new_liked_post.innerText = `${props.data[i].title.substr(
                        0,
                        20
                    )} ... (${props.data[i].comment.length})`;
                } else {
                    new_liked_post.innerText = `${props.data[i].title} (${props.data[i].comment.length})`;
                }

                // new_liked_post.innerHTML = props.data[i].title;
                new_liked_post.onclick = async function () {
                    navigate(`/community/read/${props.data[i]._id}`, {
                        state: props.data[i]._id,
                    });
                };
                like_list_div.current.appendChild(new_liked_post);
            }
        }
    };

    useEffect(() => {
        showLikedPost();
        setTimeout(() => {
            like_list_div.current.classList.add(style.show);
        }, 100);
    }, []);

    return (
        <>
            <div className={style.likelist} ref={like_list_div}>
                <p className={style.likeTitle}>좋아요 목록</p>
                <p className={style.likeDescription}>
                    글 제목 클릭시 해당 게시물로 이동합니다
                </p>
            </div>
        </>
    );
}

export default MyPageLikePost;
