import lineBan7w from "../assets/line_ban_7w.png";

import css from "../style/index.module.css"

export default function ChampionBanCell({ team, isActive, loadingImg }) {
    return (
        <div className={`h-full w-1/5 bg-black ${isActive ? (team == 'Blue' ? css.OwnAnimationBlue : css.OwnAnimationRed) : ''}`}>
            {
                loadingImg == lineBan7w ?
                <>
                    <div className="w-full h-full p-3">
                        <img className="h-full" src={loadingImg} alt="ban" />
                    </div>
                </>
                : <img className="h-full object-cover" src={loadingImg} alt="ban" />
            }
        </div>
    )
}