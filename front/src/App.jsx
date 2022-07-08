import { useState, useEffect } from "react";
import axios from "axios";
import MainDisplay from "./page/main";
import Champion from "./page/champion/champion.jsx";

function App() {
    const [loading, setLoading] = useState(false);
    const callMain = async () => {
        console.log("엑시오스 작동");
        axios
            .get("/main") // mainDisplay
            .then((res) => {
                console.log(JSON.stringify(res.data.hi));
                setLoading(true);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        callMain();
    }, []);

    return (
        <div className="App">
            {loading ? <Champion /> : <h1>Front axios connecting...</h1>}
        </div>
    );
}

export default App;
