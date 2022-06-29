import { useState, useEffect } from "react";

function Champion() {
    const mainDiv = document.getElementsByClassName("mainDisplay");
    const btnDiv = document.getElementsByClassName("button_div");
    const listBtn = document.getElementById("champList");
    const info = document.getElementById("champInfo");
    // mainDiv > 이 div 안에 champion컴포넌트 내용이 들어감
    // btnDiv > 버튼을 집어넣을 div
    // listBtn > 챔피언 목록을 불러오는 버튼
    // info > 챔피언 정보 표시할 span태그

    const champion_url =
        "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json";
    // LOL 챔피언 정보 API
    const [style, setStyle] = useState({ display: "none" });
    const [champions, setChampion] = useState({}); // 챔피언 API 데이터를 저장
    const [display, setDisplay] = useState({}); // 표시할 챔피언의 데이터를 저장 초기값은 전체 챔피언 데이터임
    const [champion_img, setImg] = useState({}); // 챔피언 img API를 저장함

    const getChamp = async () => {
        const json = await (await fetch(champion_url)).json();

        setChampion(json.data, null, "\t");
        setDisplay(json.data, null, "\t");
    }; // 챔피언 API를 받아옴 비동기 처리함

    useEffect(() => {
        getChamp();
    }, []); // 컴포넌트가 마운트 되거나 렌더링,리렌더링 될때 getChamp함수 1회 실행함

    const showChampBtn = () => {
        // 챔피언 목록 버튼을 누르면 실행되는 함수
        btnDiv[0].style.display = "block"; // btn div보이게 설정
        if (btnDiv[0].childNodes.length === 0) {
            // btn div가 비었다면 실행
            for (const key in champions) {
                // champions 오브젝트 데이터 각각의 key값으로 for문 실행
                const btn_img = document.createElement("img"); // 각각의 버튼 안에 해당 챔피언 이미지 삽입할거

                // 챔피언 목록 object의 key값들
                if (champions.hasOwnProperty(key)) {
                    btn_img.src =
                        "https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/" +
                        champions[key].id +
                        ".png"; // 버튼안에 넣을 이미지
                    const btn = document.createElement("button"); // champions 오브젝트 각각 버튼 생성 누르면 챔피언정보 보여줄것임
                    const btn_text = document.createTextNode(
                        // 챔피언 이름을 버튼에 표시하는데, quotes("",'')는 replace 함수로 지워버림
                        JSON.stringify(champions[key].name, null, "\t").replace(
                            /['"]+/g,
                            ""
                        )
                    );
                    btn.appendChild(btn_img); // 각 버튼에 아까 받아온 이미지 append
                    btn.onclick = function () {
                        // 각 버튼 onClick시 실행할 함수 정의
                        if (display === champions) {
                            // 이 if문은 특정 챔피언 눌렀다가 다시 누르면 챔피언정보 들어가게 하려한건데 작동을안함
                            info.style.display = "block"; // 챔피언 정보를 표시할 info의 display속성을 block으로 > 안보였던 span태그를 보이게한다는것
                            setDisplay(champions[key]); // display에 champions오브젝트의 해당key 값으로
                            setImg(
                                "https://ddragon.leagueoflegends.com/cdn/10.6.1/img/champion/" +
                                    champions[key].id +
                                    ".png"
                            ); // img도 display와 마찬가지로 해당key값의 이미지로
                            setStyle({ display: "block" });
                        } else if (display !== champions) {
                            // 작동 안됨
                            setDisplay(champions);
                            setStyle({ display: "none" });
                        }
                    };
                    btn.appendChild(btn_text); // 각 버튼에 위에서 설정해던 text 집어넣음
                    btnDiv[0].appendChild(btn); // 각 버튼을 btnDiv에 append, 근데 btnDiv.appendChild하면 안됨 [0]써야됨
                }
            }
        }

        const backBtn = document.createElement("button"); // 뒤로가기버튼
        const backBtn_text = document.createTextNode("뒤로가기");
        backBtn.onclick = function () {
            btnDiv[0].style.display = "none"; // 버튼들 있는 div 다시 안보이게 display none
            info.style.display = "none"; // info span태그도 none
            this.remove(); // 뒤로가기 한 후 자기자신(뒤로가기버튼) 삭제
            listBtn.style.display = "inline"; // 챔피언 리스트 버튼들 다시 표시
        };
        backBtn.appendChild(backBtn_text);
        mainDiv[0].appendChild(backBtn);
        listBtn.style.display = "none";
    };

    return (
        <div className="mainDisplay">
            <h1>Riot API Practice</h1>
            <h3>champion data</h3>

            <div className="button_div"></div>
            <button id="champList" onClick={showChampBtn}>
                챔피언 목록
            </button>
            <div>
                <span id="champInfo" style={style}>
                    <img src={champion_img} alt="" />
                    {JSON.stringify(display, null, "\t")}
                </span>
                {/* <table>
                    <th>name</th>
                    <th>title</th>
                    <th>difficulty</th>
                    <tr>
                        <td>{JSON.stringify(display.name, null, "\t")}</td>
                        <td>{JSON.stringify(display.title, null, "\t")}</td>
                        <td>{JSON.stringify(display.info, null, "\t")}</td>
                    </tr>
                </table> */}
            </div>
        </div>
    );
}

export default Champion;
