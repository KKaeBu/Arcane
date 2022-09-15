import style from "./user.module.css";

function User() {
    return (
        <div className={style.userContainer}>
            <div className={style.userProfile}>
                <div className={style.icon}>
                    <div className={style.level}>
                        319
                    </div>
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.nameAndBook}>
                    <span className={style.userName}>승수몬</span>
                    <div className={style.bookMark}></div>
                </div>
                <div className={style.refreshHistory}>
                    전적 갱신
                </div>
            </div>
        </div>
    );
}

export default User;