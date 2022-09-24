import style from "./community.module.css";
import Topbar from "../../components/community_topbar/Topbar.jsx";
import Main from "../../components/community_main/Main.jsx";
import Footer from "../../components/community_footer/Footer.jsx";
import Posting from "../../components/community_posting/Posting.jsx";
import Read from "../../components/community_read/Read.jsx";
import Correcting from "../../components/community_correct/Correct.jsx";

import { useState } from "react";

function Community(props) {
    const [user_id, setID] = useState("");

    const isClick = (selected_id) => {
        setID(selected_id);
    };

    return (
        <div className={style.community}>
            <div className={style.communityWrapper}>
                <Topbar />
                {/* {iswrite ? (
                    <Posting propFunction={isClick} />
                ) : isread ? (
                    <Read id={user_id} propFunction={isClick} />
                ) : (
                    <Main propFunction={isClick} />
                )} */}

                {props.main ? (
                    <Main />
                ) : props.write ? (
                    <Posting />
                ) : props.correct ? (
                    <Correcting />
                ) : (
                    <Read />
                )}

                <Footer />
            </div>
        </div>
    );
}

export default Community;
