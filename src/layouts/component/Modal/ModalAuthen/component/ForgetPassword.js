import classNames from "classnames/bind"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import style from '../ModalAuthen.module.scss'
import Input from '../../../../../component/Input'
import ButtonComp from '../../../../../component/ButtonComp'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { validateInputsForgetPass } from "../../../../../utills/ValidateInputs";

const cx = classNames.bind(style);

const ForgetPassword = ({ handleClose, changeLayout, showLink }) => {
    const [email, setEmail] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [timeOutButton, setTimeOutButton] = useState();
    const [listErr, setListErr] = useState({
        email: false,
        emailFormat: false,
        verifyCode: false,
    });

    const handleForgetPassword = () => {
        if (validateInputsForgetPass(listErr, { email, verifyCode }, setListErr)) {
            console.log({ email, verifyCode });
            changeLayout('setnewpass')
        }
    };

    useEffect(() => {
        console.log('re-render');
        let timer;
        if (timeOutButton > 0) {
            timer = setTimeout(() => {
                setTimeOutButton(timeOutButton - 1);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [timeOutButton]);
    const handleSendConfirmCode = () => {
        setTimeOutButton(60);

    }
    return (
        <div className={cx('content')}>
            <FontAwesomeIcon icon={faXmark} className={cx('close-icon')} onClick={handleClose} />
            <Link to='/' className={cx('logo')}>
                <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/logo-dau-nhot-npoil-new-1024x315.png" alt="Logo" />
            </Link>
            <div className={cx('title')}>
                <h2>Thay đổi mật khẩu</h2>
            </div>
            <div className={cx('form')}>
                <div className={cx('input-wrapper')}>
                    <label>Email</label>
                        <Input
                            zIndex={1002}
                            value={email}
                            setValue={setEmail}
                            errContent={listErr.emailFormat ? 'Vui lòng nhập đúng định dạng email' : ''}
                            err={!listErr.email ? listErr.emailFormat : listErr.email}
                            placeholder="Email" placementTooltip='top-end' />

                </div>
                <div className={cx('row-confirm')}>
                    <div className={cx('input-wrapper')} style={{ flex: 1 }}>
                        <label>Mã xác nhận</label>
                                <Input
                                zIndex={1002}
                                value={verifyCode}
                                setValue={setVerifyCode}
                                err={listErr.verifyCode}
                                placeholder="Mã xác nhận"
                                placementTooltip='top-end' />

                    </div>
                    <div className={cx('input-wrapper')}>
                        <ButtonComp onClick={handleSendConfirmCode} outline={true}
                            cssClass={cx('confirm-code', { 'isDisable': timeOutButton > 0 })} disabled={timeOutButton > 0}>
                            {timeOutButton > 0 ? timeOutButton : 'Gửi mã'}
                        </ButtonComp>
                    </div>

                </div>
                <div className={cx('button')}>
                    <ButtonComp onClick={handleForgetPassword} >
                        Thay đổi mật khẩu
                    </ButtonComp>
                </div>

            </div>
            <p style={{ width: '100%', paddingRight: '5rem' }}>
                {showLink && <button style={{ float: 'right' }} className={cx('link')} onClick={() => changeLayout('login')}>
                    Đăng nhập
                </button>}

            </p>
        </div>
    );
}
ForgetPassword.propTypes = {
    handleClose: PropTypes.func.isRequired,
    changeLayout: PropTypes.func.isRequired,

};

export default ForgetPassword;