import classNames from 'classnames/bind';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Home.module.scss'
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import SectionProduct from '../../component/SectionProduct';

import { fakeCategories } from './fakeCategories';
const cx = classNames.bind(styles);


function Home() {
    const imgSlide = [
        "https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/DAU.png",
        "https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/dau-4.png",
        "https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/dau-dong-co.png",
    ]
    const fakeHotDeal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1800,
    };

    const settingsHotDeal = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 1800,
        slickNext: true,
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('section-heading')}>

                <div className={cx('hidden-block')}></div>
                <div className={cx('middle-block')}>
                    <div className={cx('slider')}>
                        <Slider {...settings}>
                            {imgSlide.map((img, index) => {
                                return (
                                    <div key={index}>
                                        <img src={img} alt={`slider ${index}`} />
                                    </div>
                                )

                            })}
                        </Slider>
                    </div>
                    <div className={cx('cooperate')}>
                        <div><img src="https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/HOP-TAC-PHAN-PHOI.png" style={{ width: '100%', height: '100%' }} alt="cooperate" /></div>
                        <div><img src="https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/HOP-TAC-PHAN-PHOI.png" style={{ width: '100%', height: '100%' }} alt="cooperate" /></div>
                    </div>
                </div>
                <div className={cx('right-block')}>
                    <div className={cx('title')}>
                        <h3>
                            <b></b>
                            <span>Chất lượng cho tất cả</span>
                            <b></b>
                        </h3>
                    </div>
                    <div className={cx('content')}>
                        <div className={cx('content-wrapper')}>
                            <div>
                                <div className={cx('icon')}>
                                    <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2019/02/4.png" alt="" />
                                </div>
                                <p>Sản xuất theo công nghệ mỹ</p>
                            </div>
                            <div>
                                <div className={cx('icon')}>
                                    <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2019/02/4.png" alt="" />
                                </div>
                                <p>Sản xuất theo công nghệ mỹ</p>
                            </div>
                        </div>
                        <div className={cx('content-wrapper')}>
                            <div>
                                <div className={cx('icon')}>
                                    <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2019/02/4.png" alt="" />
                                </div>
                                <p>Sản xuất theo công nghệ mỹ</p>
                            </div>
                            <div>
                                <div className={cx('icon')}>
                                    <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2019/02/4.png" alt="" />
                                </div>
                                <p>Sản xuất theo công nghệ mỹ</p>
                            </div>
                        </div>



                    </div>
                    <div className={cx('contact')}>

                        <div className={cx('icon')}>
                            <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2019/02/img_hotline.png" alt="contact-icon" />
                        </div>
                        <div className={cx('content')}>
                            <p>
                                <span>
                                    Dịch vụ CSKH chu đáo&nbsp;
                                </span>
                                <br />
                                <span>
                                    Hotline:&nbsp;
                                    <span>
                                        <b>1900 75 75 25</b>
                                    </span>
                                </span></p>
                        </div>
                    </div>
                </div>

            </div>

            <div className={cx('hotdeal-section')}>
                <div className={cx('section-title')}>
                    <h3 className={cx('title')}>DEAL HOT ĐANG DIỄN RA</h3>
                    <a href="" className={cx('more')}>
                        Xem thêm
                        <FontAwesomeIcon icon={faAngleRight} className={cx('icon')} />
                    </a>
                </div>
                <div className={cx('section-content')}>
                    <Slider {...settingsHotDeal}>
                        {fakeHotDeal.map((product) => {
                            return (
                                <Link to='/hihi' key={product}>
                                    <div className={cx('content-wrapper')} >
                                        <div className={cx('box-image')}>
                                            <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2023/09/041022989092_PLATO46HM-XO-1.jpg" alt="" />
                                        </div>
                                        <div className={cx('box-text')}>
                                            <div className={cx('title-wrapper')}>
                                                <p>Dầu thủy lực</p>
                                                <p>Dầu thủy lực NP PLATO 46 – NPOIL</p>
                                            </div>
                                            <div className={cx('price-wrapper')}>
                                                <span>1.470.000VND - 16.000.000VND</span>
                                            </div>

                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </Slider>
                </div>
            </div>

            {fakeCategories.map((category, index) => {
                return <SectionProduct titleColor={category.nameCategory} category={category} key={index}/>

            })}


        </div>
    )
}

export default Home;
