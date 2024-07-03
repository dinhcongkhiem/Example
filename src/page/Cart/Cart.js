import { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import style from './Cart.module.scss'

import ButtonComp from "../../component/ButtonComp";
import CheckBox from "../../component/CheckBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faMinus, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
const cx = classNames.bind(style);
function Cart() {
    const [products, setProducts] = useState([
        {
            id: 1,
            imgProduct: 'https://shop.daunhotnpoil.com/wp-content/uploads/2023/09/RITO-0.5L-2-768x769.jpg',
            name: 'Dầu động cơ RITO PREMIUM 2 thì - NPOIL',
            size: '1L',
            color: 'hồng',
            price: 12050000,
            availableQuantity: 80,
            quantity: 1,
            selected: true
        },
        {
            id: 2,
            imgProduct: 'https://shop.daunhotnpoil.com/wp-content/uploads/2023/09/RITO-0.5L-2-768x769.jpg',
            name: 'Dầu động cơ RITO PREMIUM 2 thì - NPOIL',
            size: '1L',
            color: 'hồng',
            price: 12000,
            availableQuantity: 80,
            quantity: 1,
            selected: true
        },
        {
            id: 9,
            imgProduct: 'https://shop.daunhotnpoil.com/wp-content/uploads/2023/09/RITO-0.5L-2-768x769.jpg',
            name: 'Dầu động cơ RITO PREMIUM 2 thì - NPOIL',
            size: '1L',
            color: 'hồng',
            price: 120500,
            availableQuantity: 80,
            quantity: 1,
            selected: false
        },
    ]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();

    const totalPriceSelectedProducts = (() => {
        setTotalPrice(products
            .filter(item => item.selected)
            .reduce((acc, item) => acc + (item.price * item.quantity), 0));
    });

    const handleQuantityChange = (id, value) => {
        setProducts((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const numberValue = parseInt(value, 10);
                    const updatedItem = {
                        ...item,
                        quantity: value === ''
                            ? ''
                            : (!isNaN(numberValue)
                                ? Math.min(Math.max(numberValue, 1), item.availableQuantity)
                                : item.quantity)
                    };
                    if (item.selected) {
                        setTotalPrice(totalPrice - (item.quantity * item.price) + (updatedItem.quantity * updatedItem.price))
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };


    const handleBlur = (id) => {
        setProducts((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, quantity: item.quantity === '' ? 1 : item.quantity };
                    if (updatedItem.selected && updatedItem.quantity === 1) {
                        setTotalPrice(totalPrice - (item.quantity * item.price) + item.price)
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const handleDecreaseQuantity = (id) => {
        setProducts((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, quantity: Math.max(item.quantity - 1, 1) };
                    if (updatedItem.selected && item.quantity > 1) {
                        setTotalPrice((prevTotalPrice) => prevTotalPrice - updatedItem.price);
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const handleIncreaseQuantity = (id) => {
        setProducts((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, quantity: Math.min(item.quantity + 1, item.availableQuantity) };
                    if (updatedItem.selected && item.quantity < item.availableQuantity) {
                        setTotalPrice(totalPrice + updatedItem.price)
                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const handleSelectChange = (id) => {
        setProducts((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const updatedItem = { ...item, selected: !item.selected };
                    if (updatedItem.selected) {
                        setTotalPrice(totalPrice + updatedItem.price * updatedItem.quantity)
                    } else {
                        setTotalPrice(totalPrice - updatedItem.price * updatedItem.quantity)

                    }
                    return updatedItem;
                }
                return item;
            })
        );
    };

    const handleRemoveProduct = (id) => {
        setProducts((prevProducts) => {
            const productToRemove = prevProducts.find((item) => item.id === id);

            if (!productToRemove) {
                return prevProducts;
            }
            if (productToRemove.selected) {
                setTotalPrice((prevTotalPrice) => prevTotalPrice - (productToRemove.price * productToRemove.quantity));
            }
            return prevProducts.filter((item) => item.id !== id);
        });
    }

    const handlePayment = () => {
        const order = {
            products: products.filter((p) => p.selected),
            deliveryFee: 30000,
            totalPrice: totalPrice
        }
        navigate('/payment', { state : order });
    }
    useEffect(() => {
        totalPriceSelectedProducts();
    }, [])
    return (
        <div className={cx('wrapper')}>
            <div className={cx('products')}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th colSpan={3}>Sản Phẩm</th>
                            <th>Giá</th>
                            <th>Số Lượng</th>
                            <th>Tạm Tính</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr>
                                    <td >
                                        <div className={cx('wrapper-icon')} onClick={() => handleSelectChange(product.id)}>
                                            <CheckBox checked={product.selected} />
                                        </div>
                                    </td>
                                    <td className={cx('col-img')}>
                                        <div className={cx('img-product')}>
                                            <img src={product.imgProduct} alt="product" />
                                        </div>
                                    </td>
                                    <td className={cx('product-info')}>

                                        <div>
                                            <a href="#">{product.name}</a>
                                            <p>KÍCH THƯỚC: {product.size}
                                                <br />MÀU SẮC: {product.color}</p>
                                            <p className={cx('price-small')}>{product.quantity} X <span>{product.price.toLocaleString('vi-VN')}VND</span></p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className={cx('price')}>{product.price.toLocaleString('vi-VN') + 'VND'}</p>
                                    </td>
                                    <td style={{ width: '15%' }}>
                                        <div className={cx('quantity')}>
                                            <button onClick={() => handleDecreaseQuantity(product.id)}>
                                                <FontAwesomeIcon icon={faMinus} />
                                            </button>
                                            <input
                                                type="text"
                                                value={product.quantity}
                                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                                onBlur={() => handleBlur(product.id)}
                                            />
                                            <button onClick={() => handleIncreaseQuantity(product.id)}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </button>
                                        </div>
                                    </td>
                                    <td style={{ width: '18%' }}>
                                        <p className={cx('price')}>{(product.price * product.quantity).toLocaleString('vi-VN')}<span>VND</span></p>
                                    </td>
                                    <td>
                                        <div
                                            className={cx('wrapper-icon')}
                                            onClick={() => handleRemoveProduct(product.id)}
                                        >

                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>

                                    </td>
                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <Link to='/product'>
                    <ButtonComp outline={true} cssClass={cx('back-to-product')}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Tiếp tục xem sản phẩm
                    </ButtonComp>
                </Link>

            </div>
            <div className={cx('action')}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th colSpan={2}>Giỏ hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p className={cx('label')}>Tạm tính</p>
                            </td>
                            <td>
                                <p className={cx('price')}>{totalPrice.toLocaleString('vi-VN')} <span>VND</span></p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className={cx('label')}>Giao hàng</p>
                            </td>
                            <td>
                                <p className={cx('price')}>30.000 <span>VND</span></p>
                                <p className={cx('address ')}>Vận chuyển tới vị trí mặc định</p>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className={cx('label')}>Tổng</p>
                            </td>
                            <td>
                                <p className={cx('price')}>{(totalPrice + 30000).toLocaleString('vi-VN')}<span>VND</span></p>
                            </td>
                        </tr>

                    </tbody>
                </table>
                <ButtonComp onClick={handlePayment} cssClass={cx('btn-payment')}>TIẾN HÀNH THANH TOÁN</ButtonComp>

            </div>
        </div>
    );
}

export default Cart;