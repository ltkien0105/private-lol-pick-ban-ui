import { useState } from 'react';
import css from '../style/index.module.css';
import clsx from 'clsx';

export default function TeamInfo({matchInfo, patch, blueTeamLogo, middleLogo, redTeamLogo, blueScore, redScore}) {
    const [showMatchInfoAndTeamLogoAnimation, setShowMatchInfoAndTeamLogoAnimation] = useState(false);
    const [showMiddleLogoAnimation, setShowMiddleLogoAnimation] = useState(false);

    function playOpeningAnimation() {
        setTimeout(() => {
            setShowMatchInfoAndTeamLogoAnimation(true);
            setShowMiddleLogoAnimation(true);
        }, 3000);
    }

    playOpeningAnimation();

    return (
        <>
            <div className={clsx('opacity-0', showMatchInfoAndTeamLogoAnimation && css.MatchInfo)}>
                <p className="w-full font-bold">{matchInfo}</p>
                <p className="w-full flex justify-center">{patch}</p>
            </div>
            <div className="h-full grid grid-cols-[1fr_40px_1fr] gap-4">
                <div className={clsx('flex flex-col items-center justify-center gap-2 translate-x-[-121%]', showMatchInfoAndTeamLogoAnimation && css.BlueTeamLogo)}>
                    <img src={blueTeamLogo} alt="Blue team" />
                    <div className="flex items-center justify-center text-[25px] font-bold">{blueScore}</div>
                </div>
                <div className="flex items-center">
                    <img className={clsx('scale-[2] translate-y-[-20px]', showMiddleLogoAnimation && css.ScaleLogo)} src={middleLogo} alt="Middle logo" />
                </div>
                <div className={clsx('flex flex-col items-center justify-center gap-2 translate-x-[121%]', showMatchInfoAndTeamLogoAnimation && css.RedTeamLogo)}>
                    <img src={redTeamLogo} alt="Red team" />
                    <div className="flex items-center justify-center text-[25px] font-bold">{redScore}</div>
                </div>

            </div>
        </>
    )
}