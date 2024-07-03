import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

import style from './CheckBox.module.scss'
import { memo } from "react";
const cx = classNames.bind(style);
function CheckBox({checked}) {
    console.log("re-render");

    return ( 
        <div className={cx('wrapper', {'checked': checked})}>
            <FontAwesomeIcon icon={faCheck} />

        </div>
     );
}

export default memo(CheckBox);