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
                new_liked_post.setAttribute("class", style.userLikedLink);
                new_liked_post.innerHTML = props.data[i].title;
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
    }, []);

    return (
        <>
            <div className={style.likelist} ref={like_list_div}></div>
        </>
    );
}

export default MyPageLikePost;
