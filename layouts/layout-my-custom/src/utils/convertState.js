import banImg from "../assets/line_ban_7w.png";
import topSplash from "../assets/top_splash_placeholder.svg";
import jungSplash from "../assets/jung_splash_placeholder.svg";
import midSplash from "../assets/mid_splash_placeholder.svg";
import botSplash from "../assets/bot_splash_placeholder.svg";
import supSplash from "../assets/sup_splash_placeholder.svg";

const pickSplashes = [topSplash, jungSplash, midSplash, botSplash, supSplash];

/** 
* This function will check if url has value or not, if url has value, it will convert replace ws:// to http://
and concate to /cache/..., (ex: http://localhost:8999/cache/...) to get image path from /backend/cache folder.
*
* This helps load image faster, don't need to query request many time.
*/
const makeUrlAbsolute = (url, backendUrl) => {
    if (!url || !url.startsWith('/cache')) {
        return url;
    }
    const httpBackendUrl = backendUrl.replace('ws://', 'http://').replace('wss://', 'https://');
    return httpBackendUrl + url;
};

const makeSquareImgUrlAbsolute = (url, backendUrl) => {
    if (!url || !url.startsWith('/cache')) {
        return url;
    }
    const newUrl = url.replace('/champion/', '/img_square/')
    const httpBackendUrl = backendUrl.replace('ws://', 'http://').replace('wss://', 'https://');
    return httpBackendUrl + newUrl;
};

const putPlaceholders = (team, backendUrl) => {
    for (let i = 0; i < 5; i++) {
        // Picks
        // Check if exists
        if (i >= team.picks.length) {
            // Does not exists, push
            team.picks.push({
                champion: {
                    loadingImg: pickSplashes[i]
                }
            });
        } else {
            // Exists, check!
            const pick = team.picks[i];
            if (!pick.champion || !pick.champion.loadingImg) {
                pick.champion = {
                    loadingImg: pickSplashes[i]
                };
            }

            if (pick.spell1) {
                pick.spell1.icon = makeUrlAbsolute(pick.spell1.icon, backendUrl);
            }
            if (pick.spell2) {
                pick.spell2.icon = makeUrlAbsolute(pick.spell2.icon, backendUrl);
            }

            pick.champion.loadingImg = makeUrlAbsolute(pick.champion.loadingImg, backendUrl);
            pick.champion.splashImg = makeUrlAbsolute(pick.champion.splashImg, backendUrl);
            pick.champion.squareImg = makeSquareImgUrlAbsolute(pick.champion.squareImg, backendUrl);
        }

        // Bans
        if (i >= team.bans.length) {
            // Does not exist
            team.bans.push({
                champion: {
                    squareImg: banImg
                }
            });
        } else {
            const ban = team.bans[i];
            if (!ban.champion || !ban.champion.squareImg) {
                ban.champion = {
                    squareImg: banImg
                }
            }

            ban.champion.squareImg = makeSquareImgUrlAbsolute(ban.champion.squareImg, backendUrl);
        }
    }
};

/**
* Assign spell icon image and champion image to state.{red | blue|}Team.{bans | picks}
*
* Reference state format in [stateFormat.json](/Projects/Web/private-lol-ban-pick-ui/layouts/layout-my-custom/src/stateFormat.json) file.
**/
const convertState = (state, backendUrl) => {
    if (Object.keys(state).length !== 0) {
        putPlaceholders(state.blueTeam, backendUrl);
        putPlaceholders(state.redTeam, backendUrl);
    }
    return state;
}

export default convertState;
