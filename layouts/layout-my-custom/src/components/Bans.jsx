import React from 'react';
import cx from 'classnames';

import css from '../style/index.module.css';

export default function Bans(props) {
    return (
        <div className={cx(css.Ban)}>
            <div className={cx(css.BanImage, {
                [css.Active]: props.isActive
            })}>
                <img src={props.champion.squareImg} alt="" />
            </div>
    </div>
    );
}
