import style from "./change_pw.module.css";
import ChangePassword from "../../components/mypage_changePW/mypage_changePW.jsx";
import Topbar from "./../../components/main_topbar/Topbar";

function ChangePW() {
    return (
        <>
            <Topbar />
            <div className={style.changePasswordContainer}>
                <ChangePassword />
            </div>
        </>
    );
}

export default ChangePW;
