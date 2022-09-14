import style from "./community.module.css";
import Topbar from "../../components/community_topbar/Topbar.jsx";
import Main from "../../components/community_main/Main.jsx";
import Footer from "../../components/community_footer/Footer.jsx";
import Posting from "../../components/community_posting/Posting.jsx";
import Read from "../../components/community_read/Read.jsx";
import { useState } from "react";

function Community() {
    const [iswrite, setWrite] = useState(false);
    const [isread, setRead] = useState(false);
    const [user_id, setID] = useState("");

    const isClick = (string, selected_id) => {
        if (string === "write") {
            setWrite(true);
            setRead(false);
            return;
        } else if (string === "read") {
            setID(selected_id);
            setRead(true);
            setWrite(false);
            return;
        }
        setRead(false);
        setWrite(false);
    };

    return (
        <div className={style.community}>
            <div className={style.communityWrapper}>
                <Topbar />
                {/* <Main /> */}
                {/* <Posting /> */}
                {iswrite ? (
                    <Posting propFunction={isClick} />
                ) : isread ? (
                    <Read id={user_id} propFunction={isClick} />
                ) : (
                    <Main propFunction={isClick} />
                )}
                <Footer />
            </div>
        </div>
    );
}

export default Community;
