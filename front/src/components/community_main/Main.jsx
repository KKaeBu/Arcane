import style from "./main.module.css";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import TokenStorage from "./../../db/token";
import axios from "axios";
import moment from "moment/moment";

function Main() {
    const [isLogin, setLogin] = useState(false);
    const [userName, setuserName] = useState("");
    const [viewNum, setViewNum] = useState(0);
    let data = []; // 게시물 object 배열
    let index = 0;
    const socket = io.connect("http://localhost:5000");

    const newPostDiv = document.getElementsByClassName(style.newPost);
    const tbody = document.getElementsByClassName(style.tbody);
    //const pageListUl = document.getElementById(style.pageList);
    //const listRightBtn = document.getElementsByClassName(style.listRightBtn);

    const postingList = async () => {
        for (let i = data.length - 1; i >= 0; i--) {
            const tr = document.createElement("tr");

            const td_title = document.createElement("td");
            td_title.setAttribute("class", style.title);
            const a_title = document.createElement("a");
            a_title.setAttribute("class", style.titleLink);
            // eslint-disable-next-line no-loop-func
            a_title.onclick = async function () {
                await axios.get("/post/all", {}).then((res) => {
                    data = res.data;
                    // *******************  조회수 증가시키기 전에 서버에서 조회수를 다시 받아옴
                    // *******************  => 페이지를 켜놓은 동안에 다른 클라이언트에서 조회했을 조회수도 반영하기 위해서
                });
                await axios
                    .put("/post/read", {
                        _id: data[i]._id,
                        view: data[i].view,
                    })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
                window.location.reload();
            };
            a_title.innerText = data[i].title;
            td_title.appendChild(a_title);

            const td_username = document.createElement("td");
            td_username.setAttribute("class", style.nick);
            td_username.innerText = data[i].username;

            const td_date = document.createElement("td");
            td_date.setAttribute("class", style.date);
            const published_date = moment(data[i].date).format(
                "YYYY-MM-DD HH:MM"
            );
            td_date.innerText = published_date;

            const td_view = document.createElement("td");
            td_view.setAttribute("class", style.view);
            td_view.innerText = data[i].view;

            tr.appendChild(td_title);
            tr.appendChild(td_username);
            tr.appendChild(td_date);
            tr.appendChild(td_view);
            tbody[0].appendChild(tr);
        }
    };

    const pageList = async () => {
        for (let i = 1; i <= (data.length - 1) / 10 + 1; i++) {
            const pageListUl = await document.getElementById(style.pageList);
            const listRightBtn = await document.querySelector(
                "." + style["listRightBtn"]
            );
            console.dir(listRightBtn);
            const li = document.createElement("li");
            li.setAttribute("class", style.listItem);
            li.innerText = i;
            //pageListUl.appendChild(li);
            pageListUl.lastChild.before(li);
            // pageListUl.after(li);
        }
    };

    /*
     ***** 글쓰기 버튼 클릭 시 실행하는 함수
     */
    const writePost = async (event) => {
        if (isLogin) {
            await axios
                .post("/post", {
                    title: "제목",
                    postnum: 1,
                    username: userName,
                    view: 0,
                })
                .then((res) => {})
                .catch((error) => {
                    console.error(error);
                });
            socket.emit("posting", userName);
            window.location.reload();
        } else {
            window.alert("로그인이 필요한 기능입니다.");
        }
    };
    /*
     ***** 조회수를 DB에 연결하지 않아서 새로고침하면 조회수가 0이 되어버림 > 해결
     */
    // const readPost = async (event) => {
    //     await axios
    //         .put("/post/read", {
    //             postnum: 1, // 이것도 get /post 에서 받아온 데이터로 하면 될듯..?
    //             username: userName,
    //             view: viewNum,
    //         })
    //         .then((res) => {
    //             console.log(res);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         });
    //     await setViewNum(viewNum + 1);

    //     socket.emit("reading", userName, viewNum);
    // };

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

        // await axios
        //     .get("/post", {
        //         params: {
        //             postnum: 1,
        //         },
        //     })
        //     .then((res) => {
        //         setViewNum(res.data.view);
        //     });

        await axios.get("/post/all", {}).then((res) => {
            data = res.data;
        });

        await postingList();
        await pageList();
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
                <tbody className={style.tbody}>
                    {/* 개시글이 작성될때마다 동적으로 변동 */}
                    {/* 페이지당 10개씩 보이도록 */}
                    {/* 위의 선택된 정렬순서 대로 보여주기 */}
                    {/* <tr>
                        <td className={style.title}>
                            <a className={style.titleLink}>
                                어쩌구저쩌구 제목1
                            </a>
                        </td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>{viewNum}</td>
                    </tr> */}
                </tbody>
            </table>

            <div className={style.mainBottom}>
                <ul id={style.pageList}>
                    <li className={`${style.listLeftBtn} ${style.listItem}`}>
                        <ArrowLeft
                            className={`${style.listLeftBtnIcon} ${style.listBtnIcon}`}
                        />
                    </li>
                    {/* <li className={style.listItem}>
                        <span>1</span>
                    </li>
                    <li className={style.listItem}>
                        <span>2</span>
                    </li>
                    <li className={style.listItem}>
                        <span>3</span>
                    </li> */}
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
