import { useState, useEffect } from "react";
import Riot from "../../network/riotAPI.js";
import { useNavigate } from "react-router-dom";
import "./champion.css";

function Champion() {
    const Version = "12.11.1";
    const navigate = useNavigate();
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성
    const btnDiv = document.getElementsByClassName("button_div");
    // btnDiv > 버튼을 집어넣을 div

    const [champions, setChampion] = useState([]); // 챔피언 API 데이터를 저장

    const preloading_data = Object.values(champions);

    const getChamp = async () => {
        const json = await riot.getAllChampions();
        setChampion(json.data, null, "\t");
        await showChampBtn();
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    async function preImgloading(testArr) {
        let n = testArr.length;
        for (let i = 0; i < n; i++) {
            let c_img = new Image();
            let imgQ = new Image();
            let imgW = new Image();
            let imgE = new Image();
            let imgR = new Image();
            let imgP = new Image();
            let info = await riot.getChampion(testArr[i].id);
            c_img.src = `https://ddragon.leagueoflegends.com/cdn/${Version}/img/champion/${testArr[i].id}.png`;
            imgQ.src = `https://ddragon.leagueoflegends.com/cdn/${Version}/img/spell/${
                info.data[testArr[i].id].spells[0].id
            }.png`;
            imgW.src = `https://ddragon.leagueoflegends.com/cdn/${Version}/img/spell/${
                info.data[testArr[i].id].spells[1].id
            }.png`;
            imgE.src = `https://ddragon.leagueoflegends.com/cdn/${Version}/img/spell/${
                info.data[testArr[i].id].spells[2].id
            }.png`;
            imgR.src = `https://ddragon.leagueoflegends.com/cdn/${Version}/img/spell/${
                info.data[testArr[i].id].spells[3].id
            }.png`;
            imgP.src = `http://ddragon.leagueoflegends.com/cdn/${Version}/img/passive/${
                info.data[testArr[i].id].passive.image.full
            }`;
        }
    }

    preImgloading(preloading_data);

    const showChampBtn = async () => {
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
            btn_img.setAttribute("id", "champion_img");
            var btn_text;
            if (champArr[i].name.length > 7) {
                btn_text = document.createTextNode(
                    champArr[i].name.substr(0, 5) + ".."
                );
            } else {
                btn_text = document.createTextNode(champArr[i].name); // 버튼 텍스트 삽입
            }
            btn.appendChild(btn_img); // 각 버튼에 아까 받아온 이미지 append
            btn.onclick = async function () {
                // 각 버튼 onClick시 실행할 함수 정의
                navigate(`/champions/${champArr[i].id}`);
            };
            btn.appendChild(btn_text); // 각 버튼에 위에서 설정해던 text 집어넣음
            btnDiv[0].appendChild(btn); // 각 버튼을 btnDiv에 append, 근데 btnDiv.appendChild하면 안됨 [0]써야함
        }
    };
    return (
        <div className="mainDisplay">
            <h1>챔피언을 선택해 주세요!</h1>
            <div className="button_div"></div>
            {/* 아래 버튼은 컴포넌트가 실행됐을때 자동으로 showChampBtn을 한번 실행하도록 임의로 넣은것 
            수정 요망 */}
            <button
                id="champList"
                display="none"
                onClick={showChampBtn()}
            ></button>
        </div>
    );
}

export default Champion;
