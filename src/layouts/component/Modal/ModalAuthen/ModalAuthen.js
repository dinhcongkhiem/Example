import classNames from "classnames/bind"
import PropTypes from 'prop-types';
import { memo, useCallback, useContext, useEffect, useState } from "react";
import style from './ModalAuthen.module.scss'
import Login from "./component/Login";
import Register from "./component/Register";
import ForgetPassword from "./component/ForgetPassword";
import SetNewPassword from "./component/SetNewPassword";

const cx = classNames.bind(style);

function ModalAuthen({ setOpen, isOpen, startLayout }) {
    const [isClosing, setIsClosing] = useState(false);
    const [layout, setLayout] = useState('login')
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setOpen(false);
            setIsClosing(false);
            startLayout ? setLayout(startLayout) : setLayout('login')
        }, 300);
    };
    const handleChangeLayout = (layout) => {
        setTimeout(() => {
            setLayout(layout);
        }, 300);
    };
    useEffect(() => {
        if (startLayout) {
            setLayout(startLayout)
        }
    }, [])
    console.log('hihi');


    return (
        isOpen &&
        <div className={cx('wrapper', { 'isClosing': isClosing })}>
            <div className={cx('overlay')} onClick={handleClose}></div>
            {(layout === 'login') && <Login handleClose={handleClose} changeLayout={handleChangeLayout} />}
            {(layout === 'register') && <Register handleClose={handleClose} changeLayout={handleChangeLayout} />}
            {(layout === 'forgetpassword') && <ForgetPassword handleClose={handleClose} changeLayout={handleChangeLayout} showLink={!startLayout} />}
            {(layout === 'setnewpass') && <SetNewPassword handleClose={handleClose} changeLayout={handleChangeLayout} />}


        </div>

    );
}

export default memo(ModalAuthen);