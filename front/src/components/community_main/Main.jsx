import style from "./main.module.css";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import TokenStorage from "./../../db/token";
import axios from "axios";

function Main() {
    const [isLogin, setLogin] = useState(false);
    const [userName, setuserName] = useState("");
    const [viewNum, setViewNum] = useState(0);
    const socket = io.connect("http://localhost:5000");

    const newPostDiv = document.getElementsByClassName(style.newPost);

    /*
     ***** 글쓰기 버튼 클릭 시 실행하는 함수
     */
    const writePost = async (event) => {
        if (isLogin) {
            await axios
                .post("/post", {
                    postnum: 1,
                    username: userName,
                    view: 0,
                })
                .then((res) => {
                    console.log(res.data.post.view);
                    //setViewNum(res.view);
                })
                .catch((error) => {
                    console.error(error);
                });
            socket.emit("posting", userName);
        }
    };
    /*
     ***** 조회수를 DB에 연결하지 않아서 새로고침하면 조회수가 0이 되어버림
     */
    const readPost = async (event) => {
        await setViewNum(viewNum + 1);
        await axios
            .put("/post/read", {
                postnum: 1, // 이것도 get /post 에서 받아온 데이터로 하면 될듯..?
                username: userName,
                view: viewNum,
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
        socket.emit("reading", userName, viewNum);
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
                setuserName(res.data.username);
                setLogin(true);
            })
            .catch((err) => console.log(err));

        await axios
            .get("/post", {
                params: {
                    postnum: 1,
                },
            })
            .then((res) => {
                setViewNum(res.data.view);
            });
    };

    useEffect(() => {
        isValidToken();
    }, []);

    /*
     ***** socket의 on 메소드는 거의 항상 useEffect안에 넣는것이 맞는듯하다
     ***** 다른 함수에 넣게 되면 그 함수가 실행될 때마다 on메소드가 늘어나서 결국엔 on메소드가 여러개인것처럼 된다
     ***** 그럼 서버의 emit메소드 한번에 여러번의 on메소드 실행을 하는 격
     */
    useEffect(() => {
        socket.on("newPost", (data) => {
            if (data !== userName && data !== "" && userName !== "") {
                console.log(`${data} post`);
                newPostDiv[0].removeAttribute("id");
            }
        });
        socket.on("viewPlus", (user, views) => {
            if (user !== userName) {
                setViewNum(views);
            }
        });
    }, [isLogin]);

    return (
        <div className={style.mainContainer}>
            <div className={style.mainTop}>
                <div className={style.mainTopLeft}>
                    <div
                        className={`${style.listSortByNew} ${style.listSortItem}`}
                    >
                        최신순
                    </div>
                    <div
                        className={`${style.listSortByLike} ${style.listSortItem}`}
                    >
                        추천순
                    </div>
                    <div
                        className={`${style.listSortByLookup} ${style.listSortItem}`}
                    >
                        조회순
                    </div>
                </div>
                <div className={style.mainTopRight}>
                    <div className={style.writePost} onClick={writePost}>
                        글쓰기
                    </div>
                </div>
            </div>

            {/*
             *****   transparent id를 통해 처음엔 투명한상태
             ***** > 새로운 글이 올라왔다는 정보를 socket을 통해 받으면 transparent id제거
             ***** > 글을 올린 사용자 이외 모든 사용자들에게 보이게된다
             */}
            <div
                className={style.newPost}
                id={style.transparent}
                onClick={function () {
                    window.location.reload();
                }}
            >
                새로운 글!
            </div>
            <table className={style.mainMiddle}>
                <thead>
                    <tr>
                        <th>제목</th>
                        <th>닉네임</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 개시글이 작성될때마다 동적으로 변동 */}
                    {/* 페이지당 10개씩 보이도록 */}
                    {/* 위의 선택된 정렬순서 대로 보여주기 */}
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink} onClick={readPost}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>{viewNum}</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                </tbody>
            </table>

            <div className={style.mainBottom}>
                <ul className={style.pageList}>
                    <li className={`${style.listLeftBtn} ${style.listItem}`}>
                        <ArrowLeft
                            className={`${style.listLeftBtnIcon} ${style.listBtnIcon}`}
                        />
                    </li>
                    <li className={style.listItem}>
                        <span>1</span>
                    </li>
                    <li className={style.listItem}>
                        <span>2</span>
                    </li>
                    <li className={style.listItem}>
                        <span>3</span>
                    </li>
                    <li className={`${style.listRightBtn} ${style.listItem}`}>
                        <ArrowRight
                            className={`${style.listRightBtnIcon} ${style.listBtnIcon}`}
                        />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Main;
