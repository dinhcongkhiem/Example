import classNames from 'classnames/bind';

import Input from '../../../component/Input'
import ButtonComp from '../../../component/ButtonComp'

import style from '../Profile.module.scss'
import { useState, useEffect } from 'react';
import { validateInputChangeInfo, validateInputChangePass } from '../../../utills/ValidateInputs';
import { ModalAuthen } from '../../../layouts/component/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(style);
function ChangePassword() {
    const [isOpenModalAuthen, setOpenModalAuthen] = useState(false);

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [listErr, setListErr] = useState({
        password: false,
        newPassword: false,
        confirmPassword: {
            required: false,
            match: false
        },
    });

    const [isShowPass, setIsShowPass] = useState({ oldpass: false, newPass: false, confirmNewPass: false })

    const handleShowPassClick = (key) => {
        setIsShowPass((prevState) => ({
            ...prevState,
            [key]: !isShowPass[key]
        }));
    };

    useEffect(() => {
        console.log(listErr);
    }, [listErr])

    const handleChangeInfo = () => {
        if (validateInputChangePass(
            listErr,
            {
                password, newPassword, confirmPassword
            }, setListErr)) {
            console.log({ password, newPassword, confirmPassword });
        }
    }

    return (
        <div className={cx('wrapper-user-info')}>
            <h3 className={cx('title')}>Thay đổi mật khẩu</h3>
            <div className={cx('content')}>
                <div className={cx('row', 'd-flex', 'position-relative')}>
                    <label style={{ flexBasis: '40%' }}>Mật khẩu cũ</label>
                    <Input
                        value={password}
                        setValue={setPassword}
                        inputType={'password'}
                        err={listErr.password}
                        placeholder="Mật khẩu cũ"
                        placementTooltip='top-end'
                        style={{ flexBasis: '60%' }} />

                </div>
                <div className={cx('row', 'd-flex', 'position-relative')}>
                    <label style={{ flexBasis: '40%' }}>Mật khẩu mới</label>
                    <Input
                        value={newPassword}
                        setValue={setNewPassword}
                        inputType={'password'}
                        style={{ flexBasis: '60%' }}
                        err={listErr.newPassword}
                        placeholder="Mật khẩu mới"
                        placementTooltip='top-end' />


                </div>
                <div className={cx('row', 'd-flex', 'position-relative')}>
                    <label style={{ flexBasis: '40%' }}>
                        Xác nhận mật khẩu
                    </label >
                    <Input
                        value={confirmPassword}
                        setValue={setConfirmPassword}
                        inputType={'password'}
                        style={{ flexBasis: '60%' }}
                        err={listErr.confirmPassword.required || listErr.confirmPassword.match}
                        errContent={listErr.confirmPassword.match && !listErr.confirmPassword.required ? 'Mật khẩu xác nhận không khớp' : ''}
                        placeholder="Xác nhận mật khẩu"
                        placementTooltip='top-end' />


                </div>

                <a onClick={() => setOpenModalAuthen(true)} className={cx('ques-forget')}>Bạn quên mật khẩu?</a>
                <ButtonComp outline={true} onClick={handleChangeInfo}>Lưu thay đổi</ButtonComp>


            </div>
            <ModalAuthen setOpen={setOpenModalAuthen} isOpen={isOpenModalAuthen} startLayout={'forgetpassword'} />
        </div>
    );
}

export default ChangePassword;