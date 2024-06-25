import classNames from 'classnames/bind';

import style from './SectionProduct.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style)

function SectionProduct({ titleColor, category }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-title', {
                'title-color-green': titleColor === 'green',
                'title-color-pink': titleColor === 'pink',

            })}>
                <h3 className={cx('title')}>DEAL HOT ĐANG DIỄN RA</h3>
                <div className={cx('more')}>
                    <a href="" >Nhớt xe số</a>
                    <a href="" >Nhớt xe tay ga</a>
                    <a href="" >Nhớt Hộp Số</a>
                    <a href="" >Xem thêm
                        <FontAwesomeIcon icon={faAngleRight} className={cx('icon')} />
                    </a>
                </div>

            </div>
            <div className={cx('section-content')}>
                <div className={cx('banner')}>
                    <div className={cx('banner-img')}>
                        <img src={category.banner} alt="" />
                    </div>
                    <div className={cx('cloud-tag')}>
                        <ul>
                            {category.subCate.map((cate, index) => {
                                return <li key={index}><a href="#" target="blank" rel="noopener">{cate}</a></li>
                            })}
                        </ul>
                    </div>
                </div>
                <div className={cx('products')}>
                    {category.product.map((product,index) => {
                        return (
                            <Link to='/hihi' className={cx('content-wrapper')} key={index}>
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
        </div>




    );
}

export default SectionProduct;