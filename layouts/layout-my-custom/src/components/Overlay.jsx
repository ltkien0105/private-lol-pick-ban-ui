import { useState } from "react";

import blueTeamLogo from "../assets/hle_logo.png";
import middleLogo from "../assets/lck_logo.png";
import redTeamLogo from "../assets/t1_logo.png";

import ChampionPickCell from "./ChampionPickCell";
import TeamInfo from "./TeamInfo";
import ChampionBanCell from "./ChampionBanCell";

import css from "../style/index.module.css";

const Overlay = ({state, config}) => {
    const [isPicking, setIsPicking] = useState(false);
    const [isBanning, setIsBanning] = useState(true);

    function togglePickBan() {
        if (isBanning) {
            setIsBanning(false);
            setIsPicking(true);
        } else {
            setIsBanning(true);
            setIsPicking(false);
        }
    }

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
        <div className="w-screen h-screen flex flex-col justify-end">
            {/* <div className="flex justify-between">
                <div className="banBlue flex bg-white basis-[24%] h-[80px]">
                    { state.blueTeam.bans.map((ban, index) => <ChampionBanCell key={index} team={"Blue"} loadingImg={ban.champion.squareImg} />)}
                </div>
                <div className="banRed flex bg-white basis-[24%] h-[80px]">
                    { state.redTeam.bans.map((ban, index) => <ChampionBanCell key={index} team={"Red"} loadingImg={ban.champion.squareImg} />)}
                </div>
            </div> */}
            { isPicking && <div className={`bg-[red] h-[5px] ${css.Timer12}`}></div> }
            { isBanning && <div className={`bg-white h-[5px] ${css.Timer12}`}></div> }
            <div className="h-[22.5%] w-full flex overflow-hidden">
                {/* <div id="blue-team" className="flex basis-2/5 divide-x divide-[#625d6b]">
                    {state.blueTeam.picks.map((pick, index) => <ChampionPickCell key={index} pickInfo={pick} role={playerNames.blue[index].role} playerName={playerNames.blue[index].name} team={"Blue"}/>)}
                </div> */}
                <div id="overall" className="flex flex-col items-center basis-1/5 bg-[#110e18] px-[20px] gap-[10px]">
                    <TeamInfo 
                        matchInfo={"R2 MATCH 2"}
                        patch={config.frontend.patch}
                        blueTeamLogo={blueTeamLogo}
                        middleLogo={middleLogo}
                        redTeamLogo={redTeamLogo}
                        blueScore={config.frontend.blueTeam.score}
                        redScore={config.frontend.redTeam.score}
                    />
                </div>
                {/* <div id="red-team" className="flex basis-2/5 divide-x divide-[#625d6b]">
                    {state.redTeam.picks.map((pick, index) => <ChampionPickCell key={index} pickInfo={pick} role={playerNames.red[index].role} playerName={playerNames.red[index].name} team={"Red"}/>)}
                </div> */}
            </div>
        </div>
    );
}

export default Overlay;