import classNames from "classnames/bind"
import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import style from '../ModalAuthen.module.scss'
import Input from '../../../../../component/Input'
import ButtonComp from '../../../../../component/ButtonComp'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { validateInputSetNewPass } from "../../../../../utills/ValidateInputs";

const cx = classNames.bind(style);

const SetNewPassword = ({ handleClose, changeLayout, showLink }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [listErr, setListErr] = useState({
        newPassword: false,
        confirmPassword: {
            required: false,
            match: false
        },
    });

    const handleSetNewPassword = () => {
        if (validateInputSetNewPass(listErr, { newPassword, confirmPassword }, setListErr)) {
            console.log({ newPassword, confirmPassword });
        }
    };
    useEffect(() => {
        console.log(listErr);
    }, [listErr]);

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
                    <label>Mật khẩu mới</label>
                        <Input
                            zIndex={1002}
                            value={newPassword}
                            setValue={setNewPassword}
                            inputType='password'
                            err={listErr.newPassword}
                            placeholder="Mật khẩu mới"
                            placementTooltip='top-end' />

                </div>
                <div className={cx('row-confirm')}>
                    <div className={cx('input-wrapper')} style={{ flex: 1 }}>
                        <label>Xác nhận mật khẩu</label>
                                <Input
                                zIndex={1002}
                                value={confirmPassword}
                                setValue={setConfirmPassword}
                                inputType='password'
                                err={listErr.confirmPassword.required || listErr.confirmPassword.match}
                                errContent={listErr.confirmPassword.match && !listErr.confirmPassword.required ? 'Mật khẩu xác nhận không khớp' : ''}
                                placeholder="Xác nhận mật khẩu"
                                placementTooltip='top-end' />

                    </div>


                </div>
                <div className={cx('button')}>
                    <ButtonComp onClick={handleSetNewPassword} >
                        Thay đổi mật khẩu
                    </ButtonComp>
                </div>

            </div>
        </div>
    );
}
SetNewPassword.propTypes = {
    handleClose: PropTypes.func.isRequired,
    changeLayout: PropTypes.func.isRequired,

};

export default SetNewPassword;