import style from "./mypage.module.css";
import MyPageMain from "./../../components/mypage_main/Mypage_main";
import Topbar from "./../../components/main_topbar/Topbar";

function MyPage() {
    return (
        <div className={style.MyPageContainer}>
            <Topbar />
            <div className={style.myPageWrapper}>
                <MyPageMain />
            </div>
        </div>
    );
}

export default MyPage;
