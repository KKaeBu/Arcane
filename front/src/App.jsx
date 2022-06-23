import { createElement } from "react";
import logo from "./logo.svg";
import Champion from "./router/champion.jsx";

function App() {
    return (
        <>
            <div className="App">
                <p>this is App.jsx</p>
            </div>
            <Champion />
        </>
    );
}

export default App;
