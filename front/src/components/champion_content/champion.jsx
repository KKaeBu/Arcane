import { useState, useEffect } from "react";
import Riot from "../../network/riotAPI.js";
import "./champion.css";

function Champion() {
    const riot = new Riot(); // riotAPI 클래스 객체 riot을 생성

    const mainDiv = document.getElementsByClassName("mainDisplay");
    const btnDiv = document.getElementsByClassName("button_div");
    const listBtn = document.getElementById("champList");
    const info = document.getElementById("champInfo");
    // ===========================================
    // mainDiv > 이 div 안에 champion컴포넌트 내용이 들어감
    // btnDiv > 버튼을 집어넣을 div
    // listBtn > 챔피언 목록을 불러오는 버튼
    // info > 챔피언 정보 표시할 span태그

    const [style, setStyle] = useState({ display: "none" });
    const [champions, setChampion] = useState([]); // 챔피언 API 데이터를 저장
    const [display, setDisplay] = useState([]); // 표시할 챔피언의 데이터를 저장 초기값은 전체 챔피언 데이터

    const [skill_q, setQ] = useState({});
    const [skill_w, setW] = useState({});
    const [skill_e, setE] = useState({});
    const [skill_r, setR] = useState({});

    const [champion_img, setImg] = useState({}); // 챔피언 img API를 저장함

    const getChamp = async () => {
        //const json = await (await fetch(champion_url)).json();
        const json = await riot.getAllChampions();
        setChampion(json.data, null, "\t");
        setDisplay(json.data, null, "\t");
        await showChampBtn();
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

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

        // 챔피언 목록 버튼을 누르면 실행되는 함수
        btnDiv[0].style.display = "block"; // btn div보이게 설정

        if (btnDiv[0].childNodes.length === 0) {
            // btn div가 비었다면 실행
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

                    if (display === champions) {
                        // 이 if문은 특정 챔피언 눌렀다가 다시 누르면 챔피언정보 들어가게 하려한건데 작동을안함
                        info.style.display = "block"; // 챔피언 정보를 표시할 info의 display속성을 block으로 > 안보였던 span태그를 보이게한다는것
                        const json = await riot.getChampion(champArr[i].id); // 각 챔피언 정보를 받아옴

                        setQ(json.data[champArr[i].id].spells[0]);
                        setW(json.data[champArr[i].id].spells[1]);
                        setE(json.data[champArr[i].id].spells[2]);
                        setR(json.data[champArr[i].id].spells[3]);
                        // 각 챔피언의 스킬 정보 설정

                        setImg(riot.getChampionIcon(champArr[i].id)); // img도 display와 마찬가지로 해당key값의 이미지로
                        setStyle({ display: "block" });
                    } else if (display !== champions) {
                        // 작동 안됨
                        setDisplay(champions);
                        setStyle({ display: "none" });
                    }
                };
                btn.appendChild(btn_text); // 각 버튼에 위에서 설정해던 text 집어넣음
                btnDiv[0].appendChild(btn); // 각 버튼을 btnDiv에 append, 근데 btnDiv.appendChild하면 안됨 [0]써야함
            }
        }
        mainDiv[0].insertBefore(btnDiv, info);
        listBtn.style.display = "none";
    };

    return (
        <div className="mainDisplay">
            <span id="champInfo" style={style}>
                <img src={champion_img} alt="" />
                <br />

                {/* getSkillIcon 함수는 파라메터로 받아온 해당 스킬의 이미지 주소를 반환함  */}

                <img src={riot.getSkillIcon(skill_q.id)} alt="" />
                {JSON.stringify(skill_q.name, null, "\t")}
                <br />
                <img src={riot.getSkillIcon(skill_w.id)} alt="" />
                {JSON.stringify(skill_w.name, null, "\t")}
                <br />
                <img src={riot.getSkillIcon(skill_e.id)} alt="" />
                {JSON.stringify(skill_e.name, null, "\t")}
                <br />
                <img src={riot.getSkillIcon(skill_r.id)} alt="" />
                {JSON.stringify(skill_r.name, null, "\t")}
                <br />
                {/* {JSON.stringify(display.title, null, "\t")}
                <br />
                {JSON.stringify(display.lore, null, "\t")} */}
                <br />
            </span>
            <div className="button_div"></div>
            {/* 아래 버튼은 컴포넌트가 실행됐을때 자동으로 showChampBtn을 한번 실행하도록 임의로 넣은것 
            수정 요망 */}
            <button
                style={{ display: "none" }}
                id="champList"
                onClick={showChampBtn()}
            ></button>
        </div>
    );
}

export default Champion;
