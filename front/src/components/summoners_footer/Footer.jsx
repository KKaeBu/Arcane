import { GitHub } from "@mui/icons-material";
import style from "./footer.module.css";

function Footer() {
    return (
        <div className={style.footerContainer}>
            <div className={style.footerLeft}>
                <p>Project: Arcane</p>
                <p>
                    프로젝트 아케인은 Riot APIs를 활용한 챔피언 정보 분석 및
                    소환사 검색 사이트이다. 본 프로젝트를 통해 웹 API의 활용과
                    Front와 back의 연동 법 및 데이터베이스 연동법을 익히는것이
                    목표이다.
                </p>
                <p>develope by GGeaBu, SangHoon</p>
                <p>email: gghss0924@naver.com, ysh038@naver.com</p>
            </div>
            <div className={style.footerCenter}></div>
            <div className={style.footerRight}>
                <a
                    href="https://github.com/GGeaBu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.github}
                >
                    <GitHub className={style.githubIcon} />
                    <span>GGeaBu</span>
                </a>
                <a
                    href="https://github.com/ysh038"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={style.github}
                >
                    <GitHub className={style.githubIcon} />
                    <span>SangHoon</span>
                </a>
            </div>
        </div>
    );
}

export default Footer;
