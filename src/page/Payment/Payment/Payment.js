import { useEffect, useState } from 'react'
import classNames from "classnames/bind";
import Tippy from '@tippyjs/react';
import Select from 'react-select'

import Input from '../../../component/Input'
import ButtonComp from '../../../component/ButtonComp'
import CheckBox from '../../../component/CheckBox'

import DataAddress from '../../../service/Address'
import style from './Payment.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import { validateInputPayment } from '../../../utills/ValidateInputs';

const fakeUserInfo = {
    fullname: "Nguyễn Văn A",
    email: "abcdefghik@gmail.com",
    phoneNum: "0987654321",
    address: {
        provinces: {
            value: "01",
            label: "Hà Nội"
        },
        districts: {
            value: "277",
            label: "Chương Mỹ"
        },
        communes: {
            value: "10099",
            label: "Trần Phú"
        },
        addressDetail: "QƯẺTYUIOP"
    }
}

const cx = classNames.bind(style);
function Payment() {
    const location = useLocation();
    const navigate = useNavigate();
    const order = location.state;
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [provinces, setProvinces] = useState();
    const [districts, setDistricts] = useState();
    const [communes, setCommunes] = useState();
    const [addressDetail, setAddressDetail] = useState('');
    const [note, setNote] = useState('');

    const [provincesOptions, setProvincesOptions] = useState();
    const [districtsOptions, setDistrictsOptions] = useState();
    const [communesOptions, setCommunesOptions] = useState();
    const [listErr, setListErr] = useState({
        email: false,
        emailFormat: false,
        fullname: false,

        provinces: false,
        districts: false,
        communes: false,
        addressDetail: false
    });

    const [paymentType, setPaymentType] = useState(1);

    const loadDataOptions = (type, id) => {
        DataAddress.getDataAddress(type, id)
            .then(options => {
                if (type === 1) {
                    setProvincesOptions(options);
                } else if (type === 2) {
                    setDistrictsOptions(options);
                } else{
                    setCommunesOptions(options);    
                }
            })
            .catch(error => {
                console.error('Error processing data: ', error);
            });
    };
    const handleChangeOptions = (value, type) => {
        !(type === 3) && loadDataOptions(type + 1, value.value);
        
        if (type === 1) {
            setProvinces(value);
        } else if (type === 2) {
            setDistricts(value)
        } else {
           console.log((value !== fakeUserInfo.address.communes) ? 'update phí ship' : 'không update')
            setCommunes(value)
        }

    }
    const handleRegister = () => {
        if (validateInputPayment(
            listErr,
            {
                email, fullname, phoneNum,
                provinces, districts, communes,
                addressDetail, note
            }, setListErr)) {
            const productOrder = order.products.map((product) => ({
                id: product.id,
                quantity: product.quantity
            }));
            // const customerInfo =  {
            //     "tel": phoneNum,
            //     "name": fullname,
            //     "address":  addressDetail,
            //     "province": provinces.label,
            //     "district": districts.label,
            //     "ward": communes.label,
            //     "hamlet": "Khác",
            //     "note": note
            // }
            const orderDetail = {
                "order":order,
                paymentType : paymentType
            }

            console.log(orderDetail);
            navigate('/payment-detail', { state : {orderDetail},replace: true});

        };
    }

  

    useEffect(() => {
        setFullname(fakeUserInfo.fullname);
        setEmail(fakeUserInfo.email)
        setPhoneNum(fakeUserInfo.phoneNum)
        setProvinces(fakeUserInfo.address.provinces)
        setDistricts(fakeUserInfo.address.districts)
        setCommunes(fakeUserInfo.address.communes)
        setAddressDetail(fakeUserInfo.address.addressDetail)


        loadDataOptions(1, 0);
        loadDataOptions(2, fakeUserInfo.address.provinces.value);
        loadDataOptions(3, fakeUserInfo.address.districts.value);

        console.log(location.state);
        console.log(order);
        if (!order) {
            navigate('/cart');
        }
    }, []);

    if (!order) {
        return null;
    }
    return (
        <div className={cx('wrapper')}>
            <div className={cx('payment-info')}>
                <h3>Thông tin thanh toán</h3>
                <div className={cx('form')}>
                    <div className={cx('input-wrapper')}>
                        <label>Họ tên</label>
                        <Input
                            zIndex={1002}
                            value={fullname}
                            setValue={setFullname}
                            err={listErr.fullname}
                            placeholder="Họ tên"
                            placementTooltip='top-end' />
                    </div>
                    <div className={cx('row')}>
                        <div className={cx('input-wrapper')} style={{ flex: 1 }}>
                            <label>Email</label>
                            <Input
                                zIndex={1002}
                                value={email}
                                setValue={setEmail}
                                errContent={listErr.emailFormat ? 'Vui lòng nhập đúng định dạng email' : ''}
                                err={!listErr.email ? listErr.emailFormat : listErr.email}
                                placeholder="Email"
                                placementTooltip='top-end' />
                        </div>
                        <div className={cx('input-wrapper')} style={{ flexBasis: '35%' }}>
                            <label>Số điện thoại</label>
                            <Input
                                zIndex={1002}
                                value={phoneNum}
                                setValue={setPhoneNum}
                                err={listErr.phoneNum}
                                placeholder="Số điện thoại"
                                placementTooltip='top-end' />

                        </div>
                    </div>

                    <Tippy content={`Vui lòng nhập đầy đủ địa chỉ`}
                        className={cx('tooltip-address')} arrow={false}
                        visible={(listErr.provinces || listErr.districts || listErr.communes || listErr.addressDetail)}
                        placement="top-end">
                        <div className={cx('row')}>
                            <div className={cx('input-wrapper')} style={{ flexBasis: '33.333%' }}>
                                <label>Địa chỉ</label>
                                <Select
                                    options={provincesOptions}
                                    value={provinces}
                                    onChange={(value) => handleChangeOptions(value, 1)}
                                    placeholder="Tỉnh..."
                                    className={cx({ 'err-select-address': listErr.provinces })}
                                />
                            </div>
                            <div className={cx('input-wrapper')} style={{ flexBasis: '33.333%' }}>
                                <Select
                                    options={districtsOptions}
                                    value={districts}
                                    onChange={(value) => handleChangeOptions(value, 2)}
                                    placeholder="Huyện.."
                                    isDisabled={!provinces}
                                    className={cx({ 'err-select-address': listErr.districts })}

                                />
                            </div>
                            <div className={cx('input-wrapper')} style={{ flexBasis: '33.333%' }}>
                                <Select
                                    options={communesOptions}
                                    value={communes}
                                    onChange={(value) => handleChangeOptions(value, 3)}
                                    placeholder="Xã..."
                                    isDisabled={!districts}
                                    className={cx({ 'err-select-address': listErr.communes })}
                                />
                            </div>
                        </div>

                    </Tippy>
                    <div className={cx('input-wrapper')}>
                        <Input
                            zIndex={1002}
                            value={addressDetail}
                            setValue={setAddressDetail}
                            err={listErr.addressDetail}
                            errContent={null}
                            placeholder="Địa chỉ cụ thể"
                            placementTooltip='top-end' />
                    </div>

                    <div className={cx('input-wrapper')}>
                        <label>Ghi chú</label>
                        <Input
                            CssClass={cx('textarea')}
                            type={'textarea'}
                            zIndex={1002}
                            value={note}
                            setValue={setNote}
                            placeholder="Ghi chú về đơn hàng"
                            placementTooltip='top-end' />
                    </div>

                </div>
            </div>
            <div className={cx('order')}>
                <h3>Đơn hàng của bạn</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>SẢN PHẨM</th>
                            <th>TẠM TÍNH</th>

                        </tr>
                    </thead>
                    <tbody>
                        {order.products.map((product) => {
                            return (
                                <tr>

                                    <td>
                                        <p className={cx('name-product')}>{product.name}<span style={{ fontWeight: 700 }}> × {product.quantity}</span></p>
                                    </td>
                                    <td>
                                        <p className={cx('price')}>{(product.price * product.quantity).toLocaleString('vi-VN')}<span>VND</span></p>
                                    </td>
                                </tr>
                            )
                        })}


                        <tr>
                            <td>
                                <p className={cx('label')}>Tạm tính</p>
                            </td>
                            <td>
                                <p className={cx('price')}>{order.totalPrice.toLocaleString('vi-VN')}<span>VND</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className={cx('label')}>Giao hàng</p>
                            </td>
                            <td>
                                <p className={cx('price')}>{order.deliveryFee.toLocaleString('vi-VN')}<span>VND</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className={cx('label')}>Tổng</p>
                            </td>
                            <td>
                                <p className={cx('price')}>{(order.totalPrice + order.deliveryFee).toLocaleString('vi-VN')}<span>VND</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className={cx('checkbox-type-payment')} onClick={() => setPaymentType(1)}>
                                    <CheckBox checked={paymentType === 1} />
                                    <p className={cx('type-payment', 'label')}>Chuyển khoản ngân hàng</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <div className={cx('checkbox-type-payment')} onClick={() => setPaymentType(0)}>
                                    <CheckBox checked={paymentType === 0} />
                                    <p className={cx('type-payment', 'label')}>Tiền mặt</p>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <ButtonComp cssClass={cx('button-order')} onClick={handleRegister}>Đặt hàng</ButtonComp>
            </div>
        </div>
    );
}

export default Payment;