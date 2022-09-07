import style from "./community.module.css";
import Topbar from "../../components/community_topbar/Topbar.jsx";
import Main from "../../components/community_main/Main.jsx";
import Footer from "../../components/community_footer/Footer.jsx";
import Posting from "../../components/community_posting/Posting.jsx";

function Community() {
    return (
        <div className={style.community}>
            <div className={style.communityWrapper}>
                <Topbar />
                {/* <Main /> */}
                <Posting />
                <Footer />
            </div>
        </div>
    );
}

export default Community;