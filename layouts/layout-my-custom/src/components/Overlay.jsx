// import css from '../style/index.module.css';

import banImg from "../assets/ban_placeholder.svg";

import blueTeamLogo from "../assets/hle_logo.png";
import middleLogo from "../assets/lck_logo.png";
import redTeamLogo from "../assets/t1_logo.png";

import ChampionPickCell from "./ChampionPickCell";
import TeamInfo from "./TeamInfo";

const Overlay = () => {
    const playerNames = {
        blue: [
            {
                role: "Sup",
                name: "Delight"
            },
            {
                role: "Adc",
                name: "Viper"
            },
            {
                role: "Mid",
                name: "Zeka"
            },
            {
                role: "Jung",
                name: "Peanut"
            },
            {
                role: "Top",
                name: "Doran"
            }
        ],
        red: [
            {
                role: "Top",
                name: "Zeus"
            },
            {
                role: "Jung",
                name: "Oner"
            },
            {
                role: "Mid",
                name: "Faker"
            },
            {
                role: "Adc",
                name: "Gumayushi"
            },
            {
                role: "Sup",
                name: "Keria"
            }
        ]
    }

    return (
        <div className="w-screen h-screen flex items-end">
            <div className="h-[22.5%] w-full flex">
                <div id="left-team" className="flex basis-2/5 divide-x divide-[#625d6b]">
                    {playerNames.blue.map((playerName) => <ChampionPickCell key={playerName.role} role={playerName.role} playerName={playerName.name}/>)}
                </div>
                <div id="overall" className="flex flex-col items-center basis-1/5 bg-[#110e18] px-[20px] gap-[10px]">
                    <TeamInfo 
                        matchInfo={"R2 MATCH 2"} 
                        patch={"PATCH 14.16"} 
                        blueTeamLogo={blueTeamLogo} 
                        middleLogo={middleLogo} 
                        redTeamLogo={redTeamLogo}
                        blueScore={3}
                        redScore={2}
                    />
                </div>
                <div id="right-team" className="flex basis-2/5 divide-x divide-[#625d6b]">
                {playerNames.red.map((playerName) => <ChampionPickCell key={playerName.role} role={playerName.role} playerName={playerName.name}/>)}
                </div>
            </div>
        </div>
    );
}

export default Overlay;