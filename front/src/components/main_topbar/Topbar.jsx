import { useState } from "react";
import { Search, LightMode, DarkMode, Language } from "@mui/icons-material";
import style from "./topbar.module.css";
import axios from "axios";

function Topbar() {
    const [toggle, setToggle] = useState(true);
    const [inputValue, setInputValue] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault(); // 새로고침 방지
        // ***** 클라이언트 axios에서 url포트번호를 서버의 포트번호로
        // ***** 클라이언트 axios의 메소드와 서버의 메소드를 같게해야되는듯
        // ***** 아래 axios에서 post했으면 서버에서도 post로 수신함
        await axios
            .post("/search", {
                name: inputValue,
            })
            .then((res) => {
                console.log("내가 받은 데이터:", res.data);
            })
            .catch((e) => console.log("오류남 ㅋ"));
    };

    const onChange = (event) => {
        setInputValue(event.target.value);
    };

    const onclick = () => {
        setToggle(!toggle);
    };

    return (
        <div className={style.topbarContainer}>
            <div className={style.topbarLeft}>
                <img
                    src="/img/Arcane_Title.png"
                    alt="title logo"
                    className={style.logo}
                />
            </div>
            <div className={style.topbarCenter}>
                <form className={style.searchbar} onSubmit={onSubmit}>
                    {/* select box 커스텀해서 나중에 추가하기 (서버 선택용) */}
                    <input
                        placeholder="Search for Username"
                        className={style.searchInput}
                        onChange={onChange}
                    />
                    <Search className={style.searchButton} />
                </form>
            </div>
            <div className={style.topbarRight}>
                <div className={style.modeToggle}>
                    {/* 아이콘 클릭시마다 변경됨 */}
                    <DarkMode
                        className={
                            toggle
                                ? `${style.toggleIcon} ${style.active}`
                                : style.toggleIcon
                        }
                        onClick={onclick}
                    />
                    <LightMode
                        className={
                            toggle
                                ? style.toggleIcon
                                : `${style.toggleIcon} ${style.active}`
                        }
                        onClick={onclick}
                    />
                </div>
                <div className={style.seperate}>/</div>
                <div className={style.languageSelect}>
                    <Language className={style.language} />
                </div>
            </div>
        </div>
    );
}

export default Topbar;
