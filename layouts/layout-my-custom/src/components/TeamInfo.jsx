export default function TeamInfo({matchInfo, patch, blueTeamLogo, middleLogo, redTeamLogo, blueScore, redScore}) {
    return (
        <>
            <div>
                <p className="w-full font-bold">{matchInfo}</p>
                <p className="w-full flex justify-center">{patch}</p>
            </div>
            <div className="h-full grid grid-cols-[1fr_40px_1fr] gap-4">
                <div className="flex items-center">
                    <img src={blueTeamLogo} alt="Blue team" />
                </div>
                <div className="flex items-center">
                    <img src={middleLogo} alt="Middle logo" />
                </div>
                <div className="flex items-center">
                    <img src={redTeamLogo} alt="Red team" />
                </div>
                <div className="flex items-center justify-center text-[25px] font-bold">{blueScore}</div>
                <div></div>
                <div className="flex items-center justify-center text-[25px] font-bold">{redScore}</div>
            </div>
        </>
    )
}