import style from "./main.module.css";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { io } from "socket.io-client";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TokenStorage from "./../../db/token";
import axios from "axios";
import moment from "moment/moment";
import { tz } from "moment-timezone";
import queryString from "query-string";

function Main() {
    const page_query = queryString.parse(useLocation().search);
    moment.tz.setDefault("Asia/Seoul");
    const navigate = useNavigate();

    if (window.localStorage.getItem("sort") === null) {
        window.localStorage.setItem("sort", "default");
    }

    const [isLogin, setLogin] = useState(false);
    const [userName, setuserName] = useState("");

    let data = []; // 게시물 object 배열
    const socket = io.connect("http://localhost:5000");

    const newPostDiv = document.getElementsByClassName(style.newPost);
    const tbody = document.getElementsByClassName(style.tbody);
    const listSortItem = document.getElementsByClassName(style.listSortItem);

    const isLastPage = (page) => {
        if (parseInt((data.length - 1) / 15) === page - 1) {
            return 1;
        } else {
            return 0;
        }
    };
    const postingList = async (page) => {
        tbody[0].replaceChildren(); // 자식 노드 전부 삭제
        for (
            let i = data.length - 1 - (page - 1) * 15;
            i >= (data.length - 1 - (page - 1) * 15 - 14) * !isLastPage(page);
            i--
        ) {
            const tr = document.createElement("tr");
            tr.setAttribute("class", style.list);
            const td_title = document.createElement("td");
            td_title.setAttribute("class", style.title);
            const a_title = document.createElement("a");
            a_title.setAttribute("class", style.titleLink);
            // eslint-disable-next-line no-loop-func
            a_title.onclick = async function () {
                if (window.localStorage.getItem("sort") === "default") {
                    await axios.get("/post/all", {}).then((res) => {
                        data = res.data;
                    });
                } else if (window.localStorage.getItem("sort") === "view") {
                    await axios.get("/post/all/viewsort", {}).then((res) => {
                        data = res.data;
                    });
                } else if (window.localStorage.getItem("sort") === "like") {
                    await axios.get("/post/all/likesort", {}).then((res) => {
                        data = res.data;
                    });
                }

                await axios
                    .put("/post/read", {
                        _id: data[i]._id,
                        view: data[i].view,
                    })
                    .then((res) => {
                        navigate(`/community/read/${data[i]._id}`, {
                            state: data[i]._id,
                        });
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            };
            if (data[i].title.length > 20) {
                a_title.innerText = `${data[i].title.substr(0, 20)}... (${
                    data[i].comment.length
                })`;
            } else {
                a_title.innerText = `${data[i].title} (${data[i].comment.length})`;
            }
            td_title.appendChild(a_title);

            const td_username = document.createElement("td");
            td_username.setAttribute("class", style.nick);
            if (data[i].username.length > 8) {
                td_username.innerText = `${data[i].username.substr(0, 7)}...`;
            } else {
                td_username.innerText = data[i].username;
            }

            const td_date = document.createElement("td");
            td_date.setAttribute("class", style.date);

            if (
                moment(data[i].date).format("YYYY-MM-DD") ===
                moment().format("YYYY-MM-DD")
            ) {
                td_date.innerText = moment(data[i].date).format("HH:mm");
            } else {
                td_date.innerText = moment(data[i].date).format("YYYY-MM-DD");
            }

            const td_view = document.createElement("td");
            td_view.setAttribute("class", style.view);
            td_view.innerText = data[i].view;

            const td_like = document.createElement("td");
            td_like.setAttribute("class", style.like);
            td_like.innerText = data[i].Like;

            tr.appendChild(td_title);
            tr.appendChild(td_username);
            tr.appendChild(td_date);
            tr.appendChild(td_view);
            tr.appendChild(td_like);
            tbody[0].appendChild(tr);
        }
    };

    const pageList = async (current_page) => {
        if (window.localStorage.getItem("sort") === "default") {
            await axios.get("/post/all", {}).then((res) => {
                data = res.data;
            });
            console.log("최신순 정렬(default)");
            listSortItem[0].setAttribute("id", style.selectedSort);
        } else if (window.localStorage.getItem("sort") === "view") {
            await axios.get("/post/all/viewsort", {}).then((res) => {
                data = res.data;
            });
            console.log("조회수 순으로 정렬");
            listSortItem[2].setAttribute("id", style.selectedSort);
        } else if (window.localStorage.getItem("sort") === "like") {
            await axios.get("/post/all/likesort", {}).then((res) => {
                data = res.data;
            });
            console.log("추천 순으로 정렬");
            listSortItem[1].setAttribute("id", style.selectedSort);
        }

        // ***** 페이지 버튼 삭제 후 다시 생성 > 중복 생성 방지
        const pageListUl = await document.getElementById(style.pageList);

        let first_page = pageListUl.firstChild.nextSibling;
        let pages = [];

        for (let i = 0; first_page !== pageListUl.lastChild; i++) {
            pages[i] = first_page;
            first_page = first_page.nextSibling;
        }

        for (let i = 0; i < pages.length; i++) {
            pages[i].remove();
        }
        // ***** 페이지 버튼 삭제 완료

        for (let i = 1; i <= (data.length - 1) / 15 + 1; i++) {
            const pageListUl = await document.getElementById(style.pageList);
            const li = document.createElement("li");
            li.setAttribute("class", style.listItem);
            li.innerText = i;
            if (i === current_page) {
                li.setAttribute("id", style.selectedItem);
            }
            li.onclick = async function () {
                const prev_selected = document.querySelector(
                    "#" + style["selectedItem"]
                );
                prev_selected.removeAttribute("id");
                li.setAttribute("id", style.selectedItem);
                await postingList(i);
                navigate(`/community?page=${i}`);
                localStorage.setItem("page", i);
            };
            pageListUl.lastChild.before(li);
        }
    };

    /*
     ***** 글쓰기 버튼 클릭 시 실행하는 함수
     */
    const writePost = async (event) => {
        if (isLogin) {
            // props.propFunction("write");
            navigate(`/community/write`, {
                state: page_query.page,
            });
        } else {
            alert("로그인이 필요한 기능입니다.");
        }
    };

    /*
     ***** 조회수를 DB에 연결하지 않아서 새로고침하면 조회수가 0이 되어버림 > 해결
     */

    const isValidToken = async () => {
        localStorage.setItem("page", parseInt(page_query.page));
        const tokenStorage = new TokenStorage();
        const token = tokenStorage.getToken();

        await pageList(parseInt(window.localStorage.getItem("page")));
        await postingList(parseInt(window.localStorage.getItem("page")));

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
    };

    const onLeftClick = async () => {
        const prev_selected = document.querySelector(
            "#" + style["selectedItem"]
        );
        const current_page = parseInt(prev_selected.innerHTML);
        if (current_page !== 1) {
            await pageList(current_page - 1);
            await postingList(current_page - 1);
            localStorage.setItem("page", current_page - 1);
            navigate(`/community?page=${current_page - 1}`);
        }
    };

    const onRightClick = async () => {
        const pageListUl = await document.getElementById(style.pageList);
        const prev_selected = document.querySelector(
            "#" + style["selectedItem"]
        );
        const current_page = parseInt(
            pageListUl.lastChild.previousSibling.innerHTML
        );
        //
        if (current_page !== parseInt(prev_selected.innerHTML)) {
            await pageList(parseInt(prev_selected.innerHTML) + 1);
            await postingList(parseInt(prev_selected.innerHTML) + 1);
            localStorage.setItem("page", parseInt(prev_selected.innerHTML) + 1);
            navigate(
                `/community?page=${parseInt(prev_selected.innerHTML) + 1}`
            );
        }
    };

    useEffect(() => {
        isValidToken();
    }, [page_query]);

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
    }, [isLogin]);

    return (
        <div className={style.mainContainer}>
            <div className={style.mainTop}>
                <div className={style.mainTopLeft}>
                    <div
                        className={`${style.listSortByNew} ${style.listSortItem}`}
                        onClick={async () => {
                            localStorage.setItem("sort", "default");
                            await pageList(1);
                            await postingList(1);
                            localStorage.setItem("page", 1);
                            navigate(`/community?page=${1}`);

                            listSortItem[0].setAttribute(
                                "id",
                                style.selectedSort
                            );
                            listSortItem[1].removeAttribute("id");
                            listSortItem[2].removeAttribute("id");
                        }}
                    >
                        <AccessTimeIcon className={style.clockIcon} />{" "}
                        &nbsp;최신순
                    </div>
                    <div
                        className={`${style.listSortByLike} ${style.listSortItem}`}
                        onClick={async () => {
                            localStorage.setItem("sort", "like");
                            await pageList(1);
                            await postingList(1);
                            localStorage.setItem("page", 1);
                            navigate(`/community?page=${1}`);

                            listSortItem[1].setAttribute(
                                "id",
                                style.selectedSort
                            );
                            listSortItem[0].removeAttribute("id");
                            listSortItem[2].removeAttribute("id");
                        }}
                    >
                        <LocalFireDepartmentIcon className={style.fireIcon} />
                        &nbsp;추천순
                    </div>
                    <div
                        className={`${style.listSortByLookup} ${style.listSortItem}`}
                        onClick={async () => {
                            localStorage.setItem("sort", "view");
                            await pageList(1);
                            await postingList(1);
                            localStorage.setItem("page", 1);
                            navigate(`/community?page=${1}`);

                            listSortItem[2].setAttribute(
                                "id",
                                style.selectedSort
                            );
                            listSortItem[1].removeAttribute("id");
                            listSortItem[0].removeAttribute("id");
                        }}
                    >
                        <VisibilityIcon className={style.eyeIcon} />
                        &nbsp;조회순
                    </div>
                </div>
                <div className={style.mainTopRight}>
                    <div className={style.writePost} onClick={writePost}>
                        <EditIcon className={style.pencilIcon} />
                        &nbsp;글쓰기
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
                        <th>추천수</th>
                    </tr>
                </thead>
                <tbody className={style.tbody}>
                    {/* 개시글이 작성될때마다 동적으로 변동 */}
                    {/* 페이지당 10개씩 보이도록 */}
                    {/* 위의 선택된 정렬순서 대로 보여주기 */}
                </tbody>
            </table>

            <div className={style.mainBottom}>
                <ul id={style.pageList}>
                    <li
                        className={`${style.listLeftBtn} ${style.listItem}`}
                        onClick={onLeftClick}
                    >
                        <ArrowLeft
                            className={`${style.listLeftBtnIcon} ${style.listBtnIcon}`}
                        />
                    </li>
                    <li
                        className={`${style.listRightBtn} ${style.listItem}`}
                        onClick={onRightClick}
                    >
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
