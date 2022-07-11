import './menu.css';

function Menu() {

    const onClick = (e) => {
        console.log(e.target);

    }

    const btnColor = () => {
        
    }

    return (
        <div className='menuContainer'>
            <div className='menuMainButton'  onClick={onClick}>
                
            </div>
            <ul className='menuSubButtons'>
                <li className='menuSubButtonItem menuSubChampionBtn'></li>
                <li className='menuSubButtonItem menuSubItemBtn'></li>
                <li className='menuSubButtonItem menuSubRankingBtn'></li>
                <li className='menuSubButtonItem menuSubBuildBtn'></li>
                <li className='menuSubButtonItem menuStatisticsBtn'></li>
                <li className='menuSubButtonItem menuComunnityBtn'></li>
            </ul>
        </div>
    )
}

export default Menu;