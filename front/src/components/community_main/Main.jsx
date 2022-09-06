import style from "./main.module.css";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";

function Main() {
    const onClick = (e) => {
        console.log(e.target.id);
        // const sort = document.getElementById(e.target.id);
    }

    return (
        <div className={style.mainContainer}>
            <div className={style.mainTop}>
                <div className={style.mainTopLeft}>
                    <div id="listSortByNew" className={style.listSortItem} onClick={onClick}>최신순</div>
                    <div id="listSortByLike" className={style.listSortItem} onClick={onClick}>추천순</div>
                    <div id="listSortByLookup" className={style.listSortItem} onClick={onClick}>조회순</div>
                </div>
                <div className={style.mainTopRight}>
                    <div className={style.writePost}>글쓰기</div>
                </div>
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
                        <td className={style.title}><a className={style.titleLink} href="#">어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                    <tr>
                        <td className={style.title}><a className={style.titleLink}>어쩌구저쩌구 제목1</a></td>
                        <td className={style.nick}>테스트닉넴</td>
                        <td className={style.date}>2022.33.33</td>
                        <td className={style.view}>203030</td>
                    </tr>
                </tbody>
            </table>

            <div className={style.mainBottom}>
                <ul className={style.pageList}>
                    <li className={`${style.listLeftBtn} ${style.listItem}`}>
                        <ArrowLeft className={`${style.listLeftBtnIcon} ${style.listBtnIcon}`}/>
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
                        <ArrowRight className={`${style.listRightBtnIcon} ${style.listBtnIcon}`}/>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Main;