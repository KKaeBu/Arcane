import React, { useEffect, useState } from "react";

let champion_info;
let arr = [];

const Champ = () => {
    const Getchamp = async () => {
        const response = await fetch(
            "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/ko_KR/champion.json"
        );
        const data = await response.json();
        champion_info = data.data;

        for (const item in champion_info) {
            const title = champion_info[item].title;
            const blurb = champion_info[item].blurb;
            const id = champion_info[item].id;
            const name = champion_info[item].name;
            const key = champion_info[item].key;
            const version = champion_info[item].version;
            const info = champion_info[item].info;
            const stats = champion_info[item].stats;

            arr.push({
                name,
                id,
                item,
                title,
                blurb,
                key,
                version,
                info,
                stats,
            });
            //setArr({ name, id, item, title, blurb, key, version, info, stats });
        }

        //console.log(arr);
        // Object.keys(data.data).forEach((element) => {
        //     champion_info["name"].push(element);
        // });
        // console.log(champion_info.name);

        //console.log(arr);
    };
    Getchamp();
    return <div>{1}</div>;
};

export default Champ;

//const api_key = "RGAPI-9721701b-198e-49bf-8f62-64392614a92d";
//const base_url = "https://kr.api.riotgames.com"

// function parsing(info) {
//     for (const item in info) {
//         if (typeof info[item] === "object") {
//             console.log(item);
//             parsing(info[item]);
//         } else if (typeof info[item] !== "object") {
//             console.log(info[item]);
//         }
//     }
// }
