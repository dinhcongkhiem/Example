import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames/bind";
import { faMagnifyingGlassPlus, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import style from './ProductDetail.module.scss'
import PropertiesSelect from "../../component/PropertiesSelect";
import ButtomComp from '../../component/ButtonComp'
import { products } from "../Product/fakeData";
import { Gallery, Item } from "react-photoswipe-gallery";
import 'photoswipe/dist/photoswipe.css';

const cx = classNames.bind(style)
function ProductDetail() {
    const [selectedPropOption, setSelectedPropOption] = useState({})
    const [quantity, setQuantity] = useState(1);
    const [activeImg, setActiveImg] = useState(0);
    const availableQuantity = 70;
    const openGalleryRef = useRef(null);
    const fakeListImg = [
        {
            id: 1,
            url: 'https://daunhotnpoil.com/wp-content/uploads/2023/03/DAU-DONG-CO-2-THI-CAO-CAP-RITO-1-LIT-MAU-XANH.png',
            alt: 'blue'
        },
        {
            id: 2,
            url: 'https://daunhotnpoil.com/wp-content/uploads/2023/03/DAU-DONG-CO-2-THI-CAO-CAP-RITO-1-LIT-MAU-DO.png',
            alt: 'red'
        },
        {
            id: 3,
            url: 'https://daunhotnpoil.com/wp-content/uploads/2023/03/DAU-DONG-CO-2-THI-CAO-CAP-RITO-500ml-MAU-DO-MAT-SAU.png',
            alt: 'red-back'
        },
    ]
    const fakeDataProp = [
        {
            id: 1,
            name: 'Kích thước',
            options: ['1L', '500ml']
        },
        {
            id: 2,
            name: 'Màu sắc',
            options: ['#642F49', '#35455D']
        },
    ]

    const description = {
        product_name: 'Dầu máy biến thế NP TRANFOR',
        state: 'Chất lỏng, màu vàng.',
        ingredients: 'Dầu khoáng tinh chọn và phụ gia.',
        technical_standards: 'IEC 60296-2012 Edition 4.0',
        role: `Tính cách điện cao: Điện áp đánh thủng cao, tổn thất điện môi thấp và có điện trở cách điện cao. <br/>
         Khả năng bảo vệ chống ăn mòn: Độ bền oxi hóa tuyệt vời, không gây ăn mòn trong thời gian sử dụng dài.<br/>
          Tính làm mát: Có tính giải nhiệt và hấp thụ nhiệt cao. Có điểm bắt cháy cao và bốc hơi thấp.`,
        applications: 'Dầu máy biến thế NP TRANFOR chuyên dùng cho máy biến thế, biến trở và máy cắt điện.',
        safety: 'Tránh để da tiếp xúc thường xuyên với dầu nhớt. Không đổ dầu đã qua sử dụng xuống cống rãnh.',
        storage: 'Bảo quản và lưu trữ dưới mái che, nơi khô ráo, thoáng mát và nhiệt độ dưới 60<sup>o</sup>C'
    };


    return (
        <div className={cx('wrapper')}>
            <div className={cx('breadcrumb')}>
                <h3>
                    <Link to="/">Trang chủ</Link> /
                    <Link to="/">Dầu động cơ</Link> /
                    <Link to='/'>Dầu nhớt xe máy</Link>
                </h3>
            </div>
            <div className={cx('product-info')}>
                <div className={cx('product-img')}>
                    <ul className={cx('list-img')}>
                        {fakeListImg.map((img, index) => {
                            return (
                                <li onClick={() => setActiveImg(index)}>
                                    <img src={img.url} alt={img.alt} className={cx({ 'active-img': activeImg === index })} />
                                </li>
                            )
                        })}


                    </ul>
                    <div className={cx('current-img')}>
                    <img src={fakeListImg[activeImg].url} alt={fakeListImg[activeImg].alt} 
                    onClick={() => openGalleryRef.current && openGalleryRef.current()}/>
                        <Gallery>
                            {fakeListImg.map((img, index) => (
                                <Item
                                    key={img.id}
                                    original={img.url}
                                    thumbnail={img.url}
                                    width="1600"
                                    height="1600"
                                >
                                    {({ ref, open }) => {
                                        if (index === activeImg) {
                                            openGalleryRef.current = open;
                                        }
                                        return <img ref={ref} onClick={open} src={img.url} alt={img.alt} />;
                                    }}
                                </Item>
                            ))}
                        </Gallery>
                        <FontAwesomeIcon icon={faMagnifyingGlassPlus}
                            onClick={() => openGalleryRef.current && openGalleryRef.current()} />
                    </div>
                </div>
                <div className={cx('action-wrapper')}>
                    <h2 className={cx('name-product')}>Dầu động cơ RITO PREMIUM 2 thì – NPOIL</h2>
                    <h1 className={cx('price')}>500.000 <span>VND</span></h1>
                    <div className={cx('action')}>
                        <PropertiesSelect properties={fakeDataProp} selectedOptions={selectedPropOption} setSelectedOptions={setSelectedPropOption} />
                        <div className={cx('quantity')}>
                            <p className={cx('label')}>Số lượng</p>
                            <div>
                                <button onClick={() => setQuantity(qty => Math.max(1, qty - 1))}>
                                    <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <input type="text" value={quantity}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '') {
                                            setQuantity('');
                                        } else {
                                            const numberValue = parseInt(value, 10);
                                            if (!isNaN(numberValue)) {
                                                setQuantity(Math.min(Math.max(numberValue, 1), availableQuantity));
                                            }
                                        }
                                    }}
                                    onBlur={(e) => {
                                        if (e.target.value === '') {
                                            setQuantity(1);
                                        }
                                    }} />
                                <button onClick={() => setQuantity(qty => Math.min(availableQuantity, qty + 1))}>
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                                <span>{availableQuantity} sản phẩm có sẵn</span>
                            </div>
                        </div>
                        <div className={cx('btn-action')}>
                            <ButtomComp outline={true}>Thêm vào giỏ hàng</ButtomComp>
                            <ButtomComp>Mua ngay</ButtomComp>
                        </div>
                    </div>

                </div>
            </div>
            <h3 className={cx('title')}>Mô tả</h3>
            <div className={cx('product-description')}>
                <p>
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>1. Trạng thái:</strong></span>
                    <br />
                    <span dangerouslySetInnerHTML={{ __html: description.state }}></span>
                    <br />
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>2. Thành phần:</strong></span><br />
                    <span dangerouslySetInnerHTML={{ __html: description.ingredients }}></span>
                    <br />
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>3. Tiêu chuẩn kĩ thuật:</strong></span><br />
                    <span style={{ color: '#ff0000' }}>
                        <strong dangerouslySetInnerHTML={{ __html: description.technical_standards }}></strong>
                    </span>
                    <br />
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>4. Vai trò:</strong></span><br />
                    <span dangerouslySetInnerHTML={{ __html: description.role }} />
                    <br />
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>5. Ứng dụng:</strong></span><br />
                    <span dangerouslySetInnerHTML={{ __html: description.applications }}></span>
                    <br />
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>6. An toàn khi sử dụng:</strong></span><br />
                    <span dangerouslySetInnerHTML={{ __html: description.safety }}></span>
                    <br />
                    <span className={cx('title-desc')} style={{ color: '#008000' }}><strong>7. Bảo quản:</strong></span><br />
                    <span dangerouslySetInnerHTML={{ __html: description.storage }}></span>
                </p>
            </div>
            <h3 className={cx('title')}>Sản phẩm tương tự</h3>
            <div className={cx('same-products')}>

                {products.slice(12).map((product, index) => {
                    return (
                        <Link to='/product-detail' className={cx('content-wrapper')} key={index}>
                            <div className={cx('box-image')}>
                                <img src={product.image} alt="" />
                            </div>
                            <div className={cx('box-text')}>
                                <div className={cx('title-wrapper')}>
                                    <p>{product.name}</p>
                                    <p>{product.description}</p>
                                </div>
                                <div className={cx('price-wrapper')}>
                                    <span>{product.price}</span>
                                </div>

                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    );
}

export default ProductDetail;
