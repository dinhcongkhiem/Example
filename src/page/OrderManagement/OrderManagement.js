import classNames from "classnames/bind";
import style from './OrderManagement.module.scss'
import { useState } from "react";

import { fakeDataOrders } from "./fakeData";
const cx = classNames.bind(style)


function OrderManagement() {

    const [orders, setOrders] = useState([])
    const handleCreateShippingOrder = () => {
        console.log('hihiih');
    }
    const handleSaveLabel = () => {
        console.log('hihiih');
        
    }
    const handleDeleteOrder = () => {
        console.log('hihiih');
        
    }
    return (
        <div className={cx('wrapper')}>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Thông tin khách hàng</th>
                        <th>Sản phẩm</th>
                        <th>Tổng <span style={{ opacity: .5 }}>(VND)</span> </th>
                        <th>Ngày đặt hàng</th>
                        <th>Ghi chú</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {fakeDataOrders.map((order) => {
                        return (
                            <tr>
                                <td>{order.id}</td>
                                <td>
                                    <span className={cx('nameCustomer')}>{order.customer.name}</span> <br />
                                    {order.customer.phoneNum} <br />
                                    {order.customer.email} <br />
                                    {order.customer.address}
                                </td>
                                <td>
                                    <ul>
                                        {order.products.map((product) => {
                                            return (
                                                <li>
                                                    {product.name}
                                                    {product.attribute &&
                                                        <span>({Object.values(product.attribute).join(', ')})</span>
                                                    }
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td>{order.totalPrice}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.note}</td>
                                <td className={cx('status')}>
                                    <span
                                        class={cx({
                                            'canceled': order.status === -1,
                                            'pending': order.status === 1,
                                            'order-received': order.status === 2
                                        })}>
                                        {order.status === -1 ? 'Đã hủy' : (order.status === 1 ? 'Chờ xử lý' : 'Đã nhận đơn')}
                                    </span>
                                </td>
                                <td className={cx('action')}>
                                    <a href="">Tạo vận đơn</a>
                                    <a href="">Hủy</a>
                                    <a href="">Xóa</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>

            </table>
        </div>
    );
}

export default OrderManagement;