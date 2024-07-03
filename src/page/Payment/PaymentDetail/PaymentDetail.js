import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { toast } from 'react-toastify';
import style from './PaymentDetail.module.scss'
import ButtonComp from "../../../component/ButtonComp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
function PaymentDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.state);

    const { orderDetail } = location.state || { customerInfo: null, order: null };


    useEffect(() => {

        console.log(location.state);
        if (!location.state) {
            navigate('/cart');
        } else {
            toast.success('Đặt hàng thành công')
        }
    }, []);

    if (!location.state) {
        return null;
    }

    return (
        <div className={cx('wrapper')} >
            <div className={cx('wrapper-order')} >

                <div className={cx('order')}>
                    <h3>Chi tiết đơn hàng</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th>SẢN PHẨM</th>
                                <th>TẠM TÍNH</th>

                            </tr>
                        </thead>
                        <tbody>
                            {orderDetail.order.products.map((product) => {
                                return (
                                    <tr key={product.id}>

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
                                    <p className={cx('price')}>{orderDetail.order.totalPrice.toLocaleString('vi-VN')}<span>VND</span></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={cx('label')}>Giao hàng</p>
                                </td>
                                <td>
                                    <p className={cx('price')}>{orderDetail.order.deliveryFee.toLocaleString('vi-VN')}<span>VND</span></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={cx('label')}>Phương thức thanh toán</p>
                                </td>
                                <td>
                                    <p className={cx('price')}>{orderDetail.paymentType === 1 ? 'Chuyển khoản' : 'Tiền mặt'}</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className={cx('label')}>Tổng</p>
                                </td>
                                <td>
                                    <p className={cx('price')}>{(orderDetail.order.totalPrice + orderDetail.order.deliveryFee).toLocaleString('vi-VN')}<span>VND</span></p>
                                </td>
                            </tr>


                        </tbody>
                    </table>

                </div>
            </div>
            <ButtonComp outline={true} cssClass={cx('back-to-product')} onClick={() => { navigate('/product', { replace: true }) }}>
                <FontAwesomeIcon icon={faArrowLeft} />
                Tiếp tục xem sản phẩm
            </ButtonComp>
        </div>
    );
}

export default PaymentDetail;