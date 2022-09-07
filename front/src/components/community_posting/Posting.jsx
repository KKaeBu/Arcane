import {CancelPresentation} from '@mui/icons-material';
import { createElement } from 'react';
import style from "./posting.module.css";

function Posting() {
    const output = document.querySelector("." + style["postingAttachList"]);

    const onChange = () => {
        const fileInput = document.getElementById("files");
        const imageList = output.childNodes;
        const li = document.createElement("li");
        const span = document.createElement("span");

        const files = fileInput.files;
        const fileListLength = files.length;

        if (!imageList) {
            
            return;
        }

        for (let i = 0; i < fileListLength; i++) {
            // output.innerText = `${output.innerText}\n${files.item(i).name}`;
            li.setAttribute("class", style.imageListItem); //li에 클래스 설정
            const txt = document.createTextNode(files.item(i).name); //span태그에 넣을 텍스트 노드 생성
            span.appendChild(txt); //생성한 텍스트 노드 추가
            li.appendChild(span); // li에 span태그 추가
            document.createElement()
            li.innerHTML(<CancelPresentation />); //li에 아이콘 추가
            output.appendChild(li); //완성되 li을 ul에 추가
        }
    }

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
                    <ul className={style.postingAttachList}>
                        {/* <li>
                            <span>아이템1</span>
                            <CancelPresentation className={style.listDeleteBtn}/>
                        </li>
                        <li>
                            <span>아이템2</span>
                            <CancelPresentation className={style.listDeleteBtn}/>
                        </li>
                                                <li>
                            <span>아이템3</span>
                            <CancelPresentation className={style.listDeleteBtn}/>
                        </li> */}
                    </ul>
                </div>
                <div className={style.postingMain}></div>
                <div className={style.postingBottom}>   
                    <button type="submit" className={style.cancelBtn}>취소</button>
                    <button type="submit" className={style.completeBtn}>완료</button>
                </div>
            </form>
        </div>
    );
}

export default Posting;