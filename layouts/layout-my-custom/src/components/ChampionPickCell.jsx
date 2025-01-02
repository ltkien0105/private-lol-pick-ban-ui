import topSplash from "../assets/top_splash_placeholder.svg";
import jungSplash from "../assets/jung_splash_placeholder.svg";
import midSplash from "../assets/mid_splash_placeholder.svg";
import botSplash from "../assets/bot_splash_placeholder.svg";
import supSplash from "../assets/sup_splash_placeholder.svg";

import css from "../style/index.module.css"

export default function ChampionPickCell({ role, playerName }) {
    var src = "";
    switch (role) {
        case "Top":
            src =  topSplash;
            break;
        case "Jung":
            src =  jungSplash;
            break;
        case "Mid":
            src =  midSplash;
            break;
        case "Adc":
            src =  botSplash;
            break;
        case "Sup":
            src =  supSplash;
            break;
        default:
            break;
    }

    return (
        <div className={`h-full w-1/5 bg-[#18131f] ${css.OwnAnimation}`}>
            <div className="h-full flex items-center justify-center relative">
                <img src={src} alt="Champion picked" />
                <p className="absolute bottom-1 text-[#4a4750] font-bold">{playerName}</p>
            </div>
        </div>
    )
}