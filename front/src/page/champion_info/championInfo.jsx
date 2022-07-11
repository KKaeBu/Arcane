import { useParams } from "react-router-dom";
import "./championInfo.css";

function ChampionInfo() {
    const { id } = useParams();
    return (
        <div>
            <h1>{id}</h1>
        </div>
    );
}

export default ChampionInfo;
