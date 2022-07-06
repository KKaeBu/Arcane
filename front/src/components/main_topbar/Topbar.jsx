import "./topbar.css";

function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <img src="/img/Arcane_Title.png" alt="title logo" className="logo"/>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <input placeholder="Search for Username" className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                
            </div>
        </div>
    )
}

export default Topbar;