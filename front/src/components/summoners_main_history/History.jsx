import { ErrorOutline, Loop } from "@mui/icons-material"
import { useState, useEffect } from "react";
import style from "./history.module.css";
import { useNavigate } from "react-router-dom";

function History(props) {
    const navigate = useNavigate();
    const matchHistoryUl = document.querySelector("." + style["matchHistory"]); // 매치 전적 ul

    const summData = props.summonerData;
    const count = props.count;
    const newMatchList = props.isRefresh;

    const getMatchHistory = async () => {
        if (matchHistoryUl) {
            removeAllchild(matchHistoryUl);
        }

        if (summData && count) {
            const sliceMatchList = summData.matchList.slice(0, count);
            sliceMatchList.forEach((m) => {
                createMatchBox(m, false);
            })
        }
            
        if (newMatchList.length !== 0) {
            newMatchList.forEach(m => {
                createMatchBox(m, true);
            })
        }
    }
    
    const createMatchBox = (data, isNew) => {
        const matchHistory = document.querySelector("." + style["matchHistory"]); // 매치 전적 ul
        const li = document.createElement("li");

        li.setAttribute("class", style.matchInfoBox);
        if (data.result === "승리")
            li.style.backgroundColor = "#28344E";
        li.dataset.queue = data.queueType;

        const boxLeft = createBoxLeft(data);
        const boxLeftToMiddle = createBoxLeftToMiddle(data);
        const boxMiddle1 = createBoxMiddle1(data);
        const boxMiddle2 = createBoxMiddle2(data);
        const boxMiddleToRight = createBoxMiddleToRight(data);
        const boxRight = createBoxRight(data);

        const boxs = [boxLeft, boxLeftToMiddle, boxMiddle1, boxMiddle2, boxMiddleToRight, boxRight];

        boxs.forEach(b => {
            li.appendChild(b);
        });

        if (isNew) {
            matchHistory.insertBefore(li, matchHistory.firstChild);
            return;
        }

        matchHistory.appendChild(li);
    }

    const createBoxLeft = (data) => {
        // 요소 생성
        const div = document.createElement("div");
        const spanQueue = document.createElement("span");
        const spanWin = document.createElement("span");
        const spanDate = document.createElement("span");

        // 속성 부여
        div.setAttribute("class", style.infoLeft);
        spanQueue.setAttribute("class", style.spanQueue)
        if (data.result === "승리")
            spanWin.style.color = "#4444CC";
        else
            spanWin.style.color = "#CC5867";

        // 값 설정
        spanQueue.innerText = data.queueType;
        spanWin.innerText = data.result;
        spanDate.innerText = data.queueDate;

        // 부모 자식 설정
        div.appendChild(spanQueue);
        div.appendChild(spanWin);
        div.appendChild(spanDate);

        return div;
    }

    const createBoxLeftToMiddle = (data) => {
        // 요소 생성
        const infoLeftToMiddle = document.createElement("div");
        const championIcon = document.createElement("div");
        const spellBox = document.createElement("div");
        const runeBox = document.createElement("div");
        const championImg = document.createElement("img");
        const levelWrapper = document.createElement("div");
        const championLevel = document.createElement("span");
        
        const spellDWrapper = document.createElement("div");
        const spellFWrapper = document.createElement("div");
        const spellD = document.createElement("img");
        const spellF = document.createElement("img");

        const mainRuneWrapper = document.createElement("div");
        const subRuneWrapper = document.createElement("div");
        const mainRune = document.createElement("img");
        const subRune = document.createElement("img");

        // 요소에 속성 부여
        infoLeftToMiddle.setAttribute("class", style.infoLeftToMiddle);
        championIcon.setAttribute("class", style.championIcon);
        spellBox.setAttribute("class", style.spellBox);
        runeBox.setAttribute("class", style.runeBox);
        championImg.setAttribute("class", style.championImg);
        levelWrapper.setAttribute("class", style.levelWrapper);
        championLevel.setAttribute("class", style.championLevel);

        spellDWrapper.setAttribute("class", style.spellWrapper);
        spellFWrapper.setAttribute("class", style.spellWrapper);
        spellD.setAttribute("class", style.spellD);
        spellF.setAttribute("class", style.spellF);

        mainRuneWrapper.setAttribute("class", style.runeWrapper);
        subRuneWrapper.setAttribute("class", style.runeWrapper);
        mainRune.setAttribute("class", style.mainRune);
        subRune.setAttribute("class", style.subRune);

        // 이미지 테그들에 src, alt 속성 부여
        championImg.setAttribute("src", data.champion);
        championImg.setAttribute("alt", "champion square image");
        spellD.setAttribute("src", data.spell1);
        spellD.setAttribute("alt", "summoner spell1 image");
        spellF.setAttribute("src", data.spell2);
        spellF.setAttribute("alt", "summoner spell2 image");
        mainRune.setAttribute("src", data.mainRune);
        mainRune.setAttribute("alt", "main rune image");
        subRune.setAttribute("src", data.subRune);
        subRune.setAttribute("alt", "sub rune image");

        championLevel.innerText = data.championLevel;

        // 각 테그들의 부모자식 관계 설정
        levelWrapper.appendChild(championLevel);

        championIcon.appendChild(championImg);
        championIcon.appendChild(levelWrapper);

        spellDWrapper.appendChild(spellD);
        spellFWrapper.appendChild(spellF);

        spellBox.appendChild(spellDWrapper);
        spellBox.appendChild(spellFWrapper);

        mainRuneWrapper.appendChild(mainRune);
        subRuneWrapper.appendChild(subRune);

        runeBox.appendChild(mainRuneWrapper);
        runeBox.appendChild(subRuneWrapper);

        infoLeftToMiddle.appendChild(championIcon);
        infoLeftToMiddle.appendChild(spellBox);
        infoLeftToMiddle.appendChild(runeBox);

        return infoLeftToMiddle;
    }

    const createBoxMiddle1 = (data) => {
        // 요소 생성
        const infoMiddle1 = document.createElement("div");
        const itemBuild = document.createElement("ul");
        const wardItem = document.createElement("img");
        const itemIds = [
            data.item0,
            data.item1,
            data.item2,
            data.item3,
            data.item4,
            data.item5,
            data.item6,
        ];

        // 속성 부여
        infoMiddle1.setAttribute("class", style.infoMiddle1);
        itemBuild.setAttribute("class", style.itemBuild);
        wardItem.setAttribute("class", `${style.item} ${style.wardItem}`);

        for (let i = 0; i < itemIds.length; i++){
            const item = document.createElement("li");
            const itemImg = document.createElement("img");
            const link = itemIds[i];
            
            if (i === itemIds.length - 1) {
                wardItem.setAttribute("src", link);
                break;
            }
            
            item.setAttribute("class", style.item);
            itemImg.setAttribute("class", style.itemImg);
            itemImg.setAttribute("alt", "item Img");
            itemImg.setAttribute("src", link);

            if (itemIds[i] === "") {
                const emptyItemImg = document.createElement("img");
                item.appendChild(emptyItemImg);
            } else
                item.appendChild(itemImg);
            
            itemBuild.appendChild(item);
        }

        infoMiddle1.appendChild(itemBuild);
        infoMiddle1.appendChild(wardItem);

        return infoMiddle1;
    }

    const createBoxMiddle2 = (data) => {
        // 요소 생성
        const infoMiddle2 = document.createElement("div");
        const kdaLabel = document.createElement("span");
        const kdaScoreLabel = document.createElement("span");
        const csLabel = document.createElement("span");

        const kda = parseInt(data.kda);
        // 값 조정
        const calcKDA = Math.round((kda + Number.EPSILON) * 100) / 100;

        // 속성 부여
        infoMiddle2.setAttribute("class", style.infoMiddle2);
        kdaLabel.setAttribute("class", style.kdaLabel);
        kdaLabel.innerHTML = `${data.kills} / <span style="color: red; font-weight: bold">${data.deaths}</span> / ${data.assists}`;
        if (calcKDA >= 3 && calcKDA < 4)
            kdaScoreLabel.innerHTML = `평점: <span style="color: #4444CC; font-weight: bold">${calcKDA}</span>`;
        else if (calcKDA >= 4)
            kdaScoreLabel.innerHTML = `평점: <span style="color: #CC5867; font-weight: bold">${calcKDA}</span>`;
        else
            kdaScoreLabel.innerText = `평점: ${calcKDA}`;

        csLabel.innerText = `CS: ${data.cs}`;

        infoMiddle2.appendChild(kdaLabel);
        infoMiddle2.appendChild(kdaScoreLabel);
        infoMiddle2.appendChild(csLabel);

        return infoMiddle2;
    }

    const createBoxMiddleToRight = (data) => {
        // 요소 생성
        const infoMiddleToRight = document.createElement("div");
        const span = document.createElement("span");

        // 속성 부여
        infoMiddleToRight.setAttribute("class", style.infoMiddleToRight);
        span.innerText = data.time;

        // 부모 자식 설정
        infoMiddleToRight.appendChild(span);

        return infoMiddleToRight;
    }

    const createBoxRight = (data) => {
        // 요소 생성
        const infoRight = document.createElement("div");
        const blueTeams = document.createElement("ul");
        const redTeams = document.createElement("ul");

        infoRight.setAttribute("class", style.infoRight);
        blueTeams.setAttribute("class", style.blueTeams);
        redTeams.setAttribute("class", style.redTeams);

        data.participants.forEach((p, i) => {
            const summoner = document.createElement("li");
            const playedChampionImg = document.createElement("img");
            const summonerName = document.createElement("span");
            
            summoner.setAttribute("class", style.summoner);
            playedChampionImg.setAttribute("class", style.playedChampionImg);
            playedChampionImg.setAttribute("src", p.champion);
            playedChampionImg.setAttribute("alt", "summoner's played champ");
            summonerName.setAttribute("class", style.summonerName);

            summonerName.innerText = p.summonerName;
            summonerName.onclick = function () { summonerNavigate(p.summonerName); };

            summoner.appendChild(playedChampionImg);
            summoner.appendChild(summonerName);
            

            if (i < 5)
                blueTeams.appendChild(summoner);
            else
                redTeams.appendChild(summoner);

        });

        infoRight.appendChild(blueTeams);
        infoRight.appendChild(redTeams);

        return infoRight;
    }

    // 정렬 아이템 클릭시 실행 함수
    const sortClick = (e) => {
        const matchHistory = document.querySelector("." + style["matchHistory"]); // 매치 전적 ul
        let clickedSortItem = e.target;
        if (e.target.parentNode.classList[0] === style.sortBtn)
            clickedSortItem = e.target.parentNode;

        const activeSortItem = document.querySelector("." + style["active"]); //현재 활성화된 정렬기준

        activeSortItem.classList.remove(style.active);
        clickedSortItem.classList.add(style.active);

        const matchList = matchHistory.childNodes;

        if (clickedSortItem.innerText === "전체") {
            for (let i = 0; i < matchList.length; i++) {
                matchList[i].style.display = "flex";
            }
        } else {
            for (let i = 0; i < matchList.length; i++) {
                if (matchList[i].dataset.queue === clickedSortItem.innerText)
                    matchList[i].style.display = "flex";
                else
                    matchList[i].style.display = "none";
            }
        }

    }

    const removeAllchild = (div) => {
        while(div.hasChildNodes()){
            div.removeChild(div.firstChild);
        }
    }

    const summonerNavigate = (summonerName) => {
        navigate(`/summoners/${summonerName}`, {
            state: {
                summoner: summonerName,
            }
        })
    }

    const moreMatch = async () => {
        const moreBtn = document.querySelector("." + style["matchMoreBtn"]);
        const loadingCircle = document.querySelector("." + style["loadingCircle"]);
        const matchMoreLabel = document.querySelector("." + style["matchMoreLabel"]);
        
        loadingCircle.style.display = "flex";
        matchMoreLabel.style.display = "none";

        const moreMatchList = await props.isMoreMatch();
        // console.log("moreMatchList: ", moreMatchList);

        if (!moreMatchList) {
            console.log("더이상 불러올 전적이 없습니다.");
            const notMatchDiv = document.querySelector("." + style["notMatchList"]);

            moreBtn.style.display = "none";
            notMatchDiv.style.display = "flex";

            return;
        } else {
            moreMatchList.forEach(m => {
                createMatchBox(m, false);
            })

            loadingCircle.style.display = "none";
            matchMoreLabel.style.display = "block";
        }
    }

    useEffect(() => {
        getMatchHistory();
    }, [summData, newMatchList]);
    
    return (
        <div className={style.historyContainer}>
            <div className={style.historyTopbar}>
                <div id="allHistory" className={`${style.sortBtn} ${style.active}`} onClick={sortClick}><span>전체</span></div>
                <div id="soloHistory" className={`${style.sortBtn}`} onClick={sortClick}><span>솔로랭크</span></div>
                <div id="flexHistory" className={`${style.sortBtn}`} onClick={sortClick}><span>자유랭크</span></div>
            </div>
            
            <ul className={style.matchHistory}>
            </ul>
            <button className={style.matchMoreBtn} onClick={moreMatch}>
                <div className={style.loadingCircle} style={{ display: "none" }}>
                    <div className={style.innerLoadingCircle}></div>
                </div>
                <span className={style.matchMoreLabel}>+ 더 불러오기</span>
            </button>           
            <div className={style.notMatchList} style={{ display: "none" }}>
                <div className={style.notMatchError}>
                    <ErrorOutline className={style.errorIcon} />
                    <span>더이상 불러올 전적이 없습니다.</span>
                </div>
            </div>
        </div>
    );
}

export default History;