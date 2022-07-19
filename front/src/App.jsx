import { useState, useEffect } from "react";
import axios from "axios";
import MainDisplay from "./page/Main";

function App() {
    const [lodding, setLodding] = useState(false);
    const callMain = async () => {
        console.log('엑시오스 작동');
        axios.get("/main") // mainDisplay
            .then((res) => {
                console.log(res.data)
                setLodding(true);
            })
            .catch((error) => console.log("error 발생!!!!"))
    };

    useEffect(()=>{
        callMain();
    }, []);
    
    return (
      <div className="App">
        {/* {lodding ? (
          <MainDisplay />
        ) : (
          <h1>Front axios connecting...</h1>
        )} */}
        <MainDisplay />
      </div>
    );
}

export default App;
