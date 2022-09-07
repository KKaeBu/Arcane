import { useEffect } from "react";
import { useState } from "react";
import style from "./posting.module.css";

function Posting() {
    const maxListNum = 4; //최대 파일 첨부 개수
    const [count, setCount] = useState(0); //현재 등록된 이미지 파일 개수
    const [restLength, setRestLength] = useState(4); //마저 등록할 수 있는 이미지 파일의 개수
    const ul = document.querySelector("." + style["postingAttachList"]);

    const onChange = async () => {
        const fileInput = document.getElementById("files");
        const output = document.querySelector("." + style["postingAttachList"]);
        const imageList = output.childNodes;

        const files = fileInput.files; //추가할 파일의 목록
        const fileListLength = files.length; //추가하려는 파일의 개수

        // 이미지 리스트가 비어있진 않고,
        // 추가하려는 이미지 파일의 개수가
        // 4-(현재 첨부된 파일 개수) 가 0보다 클 경우
        if (!imageList && fileListLength <= maxListNum) {
            if (fileListLength > maxListNum) {
                alert("첨부 파일은 최대 4개 까지 가능합니다.");
                return;
            }

            return;
        }

        if (!imageList && fileListLength <= maxListNum) {          
            // 이미지 리스트가 비어있고, 추가하려는 이미지 파일의
            // 개수가 4개 이하일 경우
            await appendAttachList(files, fileListLength, output);
        } else if (!imageList && fileListLength > maxListNum) {
            // 이미지 리스트가 비어있고,
            // 추가하려는 이미지 파일의 개수가
            // 4개 초과 일 경우(최대 파일 첨부 개수 초과)
            alert("첨부 파일은 최대 4개 까지 가능합니다.");
        } else if (imageList && fileListLength <= restLength) {
            // 이미지 리스트가 비어있지 않고,
            // 추가하려는 이미지 파일의 개수가
            // 현재 남은 자리의 개수보다 적은 경우 (첨부 가능시)
            await appendAttachList(files, fileListLength, output);
        } else if(imageList && fileListLength > restLength) {
            // 이미지 리스트가 비어있지 않고,
            // 추가하려는 이미지 파일의 개수가
            // 현재 남은 자리의 개수보다 많은 경우 (첨부 불가능시)
            alert("첨부 파일은 최대 4개 까지 가능합니다.2");
        }
    }

    const appendAttachList = async (files, fileListLength, output) => {
        let check = 0; //중복파일 개수 체크
        for (let i = 0; i < fileListLength; i++) {
            const li = document.createElement("li");
            const span = document.createElement("span");
            const img = document.createElement("img");

            if (!overCheck(files, files.item(i).name)) {
                alert("이미 등록한 사진입니다!");
                check++; //중복 될때마다 1씩 증가
                continue;
            }

            li.setAttribute("class", style.imageListItem); //li에 클래스 설정
            const txt = document.createTextNode(files.item(i).name); //span태그에 넣을 텍스트 노드 생성
            span.appendChild(txt); //생성한 텍스트 노드 추가
            li.appendChild(span); // li에 span태그 추가
            li.setAttribute("id", files.item(i).name);
            img.setAttribute("class", style.listDeleteBtn);
            img.setAttribute("id", files.item(i).name);
            img.src = "/img/cancel.png";
            li.appendChild(img); //li에 아이콘 추가
            output.appendChild(li); //완성되 li을 ul에 추가
        }
        setCount(count + fileListLength - check); //전체 값에서 중복 값을 빼줌
        setRestLength(restLength - fileListLength + check); //전체 값에서 중복 값을 더해줌
    };

    // 중복체크 함수
    const overCheck = (files, name) => {
        const lis = document.querySelectorAll("." + style["imageListItem"]);
        if (!lis)
            return false;
        
        for (let i = 0; i < lis.length; i++){
            if (lis[i].id === name) {
                return false;
            }
        }

        return true; //중복이 아니라면 true
    };


    //첨부 이미지 삭제시 발생 이벤트 리스너 (한번에 하나씩밖에 삭제 못함)
    const clickListener = (e) => {
        if (e.target && e.target.className === style.listDeleteBtn) {
            const lis = document.querySelectorAll("." + style["imageListItem"]);

            console.dir(e.target);
            console.dir(lis);
            for (let i = 0; i < lis.length; i++){
                if (lis[i].id === e.target.parentNode.id) {
                    lis[i].remove();
                    break;
                }
            }
            
            setCount(count - 1);
            setRestLength(restLength + 1);
        }
    };

    return (
        <div className={style.postingContainer}>
            <form action="" className={style.postingWrapper}>
                <input className={style.postingTitle} placeholder="제목"></input>
                <div className={style.postingAttach}>
                    <label className={style.postingAttachLabel} htmlFor="files">사진 첨부</label>
                    <input
                        id="files"
                        type="file" name="postingImgFile"
                        multiple
                        accept="image/jpg, image/png, image/jpeg"
                        onChange={onChange}
                        style={{ display: "none" }}
                    ></input>
                    <ul className={style.postingAttachList} onClick={clickListener}>
                    </ul>
                </div>
                <div className={style.postingMain}>
                    <p>{ count }</p>
                    <p>{ restLength }</p>
                </div>
                <div className={style.postingBottom}>   
                    <button type="submit" className={style.cancelBtn}>취소</button>
                    <button type="submit" className={style.completeBtn}>완료</button>
                </div>
            </form>
        </div>
    );
}

// function appendAttachList(files, fileListLength, output, count) {
//     for (let i = 0; i < fileListLength; i++) {
//         const li = document.createElement("li");
//         const span = document.createElement("span");
//         const img = document.createElement("img");

//         li.setAttribute("class", style.imageListItem); //li에 클래스 설정
//         const txt = document.createTextNode(files.item(i).name); //span태그에 넣을 텍스트 노드 생성
//         span.appendChild(txt); //생성한 텍스트 노드 추가
//         li.appendChild(span); // li에 span태그 추가
//         li.setAttribute("id", files.item(i).name);
//         img.setAttribute("class", style.listDeleteBtn);
//         img.setAttribute("id", files.item(i).name);
//         img.src = "/img/cancel.png";
//         li.appendChild(img); //li에 아이콘 추가
//         output.appendChild(li); //완성되 li을 ul에 추가
//         setCount(count++);
//     }
// }

// function clickListener(e) {
//     if (e.target && e.target.className === style.listDeleteBtn) {
//         const fileInput = document.getElementById("files");
//         const output = document.querySelector("." + style["postingAttachList"]);
//         const lis = document.querySelectorAll("." + style["imageListItem"]);
//         const imageList = output.childNodes;

//         const files = fileInput.files;
//         const fileListLength = files.length;

//         const imgTxt = e.target.previousSibling.innerText;
//         const liNode = e.target.parentNode;
//         console.log("click");
//         console.log(fileListLength);

//         for (let i = 0; i < fileListLength; i++){
//             if (imgTxt === files.item(i).name) {
//                 console.log("clear");
//                 lis[i].remove();
//                 setCount(count--);
//             }
//         }
//     }
// }

export default Posting;