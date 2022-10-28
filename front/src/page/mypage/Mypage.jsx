import style from "./mypage.module.css";
import MyPageMain from "./../../components/mypage_main/Mypage_main";
import Topbar from "./../../components/main_topbar/Topbar";
// import Riot from "../../network/riotAPI";
import { useRef } from "react";

function MyPage() {
    // const riot = new Riot();
    const myPage_wrapper = useRef(null);

    // const SetBackgroundImg = async () => {
    //     const json = await riot.getAllChampions(); // 모든 챔피언 정보 불러오기
    //     // random 한 챔피언을 선택하도록 해야함
    //     const allChampCount = Object.keys(json.data).length; // 총 챔피언 개수
    //     const chooseRandomChampNumber = Math.floor(
    //         Math.random() * allChampCount
    //     ); // 랜덤한 챔피언 번호 선택
    //     const chooseRandomChamp = Object.keys(json.data)[
    //         chooseRandomChampNumber
    //     ]; // 뽑힌 챔피언 이름 가져오기
    //     riot.getChampionSkinIllustration();
    //     myPage_wrapper.current.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${await riot.getChampionIllustration(
    //         chooseRandomChamp
    //     )})`;
    // };

    // useEffect(() => {
    //     SetBackgroundImg();
    // }, []);

    return (
        <div className={style.MyPageContainer}>
            <Topbar />
            <div className={style.myPageWrapper} ref={myPage_wrapper}>
                <MyPageMain />
            </div>
        </div>
    );
}

export default MyPage;
