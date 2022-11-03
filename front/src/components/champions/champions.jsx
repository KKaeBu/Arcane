import { useState, useEffect, useRef } from "react";
import Riot from "../../network/riotAPI.js";
import { useNavigate } from "react-router-dom";
import style from "./champions.module.css";

function Champion() {
    const navigate = useNavigate();
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const btnDiv = useRef(null);
    // btnDiv > 버튼을 집어넣을 div

    const [champions, setChampion] = useState([]); // 챔피언 API 데이터를 저장

    const getChamp = async () => {
        const json = await riot.getAllChampions();
        setChampion(json.data, null, "\t");
    }; // 챔피언 API를 받아옴 비동기 처리함

    const showChampBtn = async () => {
        const rotation_data = await riot.getRotationChampion();
        const free_champion_ids = rotation_data.freeChampionIds;
        const free_for_newPlayers = rotation_data.freeChampionIdsForNewPlayers;

        const champArr = Object.values(champions).sort((a, b) =>
            a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
        );
        // ============== 챔피언을 가나다 순으로 정렬 ==============
        // Object.values 메소드는 오브젝트의 value값만 추출한 후 새로운 배열을 반환함
        // 새롭게 만든 배열은 sort메소드를 통해 정렬하는데, 이때 각 배열의 속성값들은 전부 오브젝트임
        // (champions 오브젝트는 오브젝트 안에 또 다른 오브젝트들이 들어가있는 형식이기 때문)
        // 각 배열의 속성값인 오브젝트들에서 name이라는 key값의 value들을 비교해서 sort 정렬을 함
        // 이때 각 name의 value값들은 한글이라서 그런지 toLowerCase라는 소문자로 변경하는 메소드를 사용하지 않으면 정렬이 안됨
        // sort메소드는 비교값 중에 앞 인덱스 값이 더 크면 양수를 반환해 순서를 바꾸고, 아니라면 음수를 반환해 인덱스 순서 유지
        // 그래서 a.name과 b.name을 비교해 앞의 것이 더 크다면 1을 반환해 sorting하게 한다

        for (let i = 0; i < champArr.length; i++) {
            // 모든 champArr배열의 속성값에 대해 실행하도록 반복문을 설정

            const btn_img = document.createElement("img"); // 각각의 버튼 안에 해당 챔피언 이미지 삽입
            btn_img.src = riot.getChampionIcon(champArr[i].id); // 버튼안에 넣을 이미지
            const btn = document.createElement("button"); // champions 오브젝트 각각 버튼 생성 누르면 챔피언정보 보여줄것임
            btn.setAttribute("class", style.championButton);
            btn_img.setAttribute("class", style.champion_img);
            var btn_text;
            if (champArr[i].name.length > 7) {
                btn_text = document.createTextNode(
                    champArr[i].name.substr(0, 5) + ".."
                );
            } else {
                btn_text = document.createTextNode(champArr[i].name); // 버튼 텍스트 삽입
            }
            btn.appendChild(btn_img); // 각 버튼에 아까 받아온 이미지 append
            btn.onclick = async () => {
                // 각 버튼 onClick시 실행할 함수 정의
                navigate(`/champions/${champArr[i].id}`);
            };

            // 로테이션 챔피언인지 판별
            for (let j = 0; j < free_champion_ids.length; j++) {
                if (parseInt(champArr[i].key) === free_champion_ids[j]) {
                    const free_div = document.createElement("div");

                    // const free_img = document.createElement("img");
                    // free_img.src = "/img/free.png";
                    // free_img.setAttribute("class", style.freeImg);
                    // free_div.appendChild(free_img);

                    free_div.setAttribute("class", style.freeDiv);
                    free_div.innerHTML = "FREE";
                    btn.appendChild(free_div);
                }
            }

            for (let j = 0; j < free_for_newPlayers.length; j++) {
                if (parseInt(champArr[i].key) === free_for_newPlayers[j]) {
                    const new_free_div = document.createElement("div");
                    new_free_div.setAttribute("class", style.newfreeDiv);
                    new_free_div.innerHTML = "Free For<br>New";
                    btn.appendChild(new_free_div);
                }
            }

            btn.appendChild(btn_text); // 각 버튼에 위에서 설정해던 text 집어넣음
            btnDiv.current.appendChild(btn); // 각 버튼을 btnDiv에 append, 근데 btnDiv.appendChild하면 안됨 [0]써야함
        }
    };

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    useEffect(() => {
        showChampBtn();
    }, [champions]);

    return (
        <div className={style.mainDisplay}>
            <h1>챔피언을 선택해 주세요!</h1>
            <div className={style.buttonDiv} ref={btnDiv}></div>
        </div>
    );
}

export default Champion;
