import styles from './Header.module.scss'
import classNames from 'classnames/bind';
import { faCartShopping, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavItem } from './NavItemsData';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import NavItems from '../../../component/NavItems';
import { useEffect, useRef, useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { Link, useLocation } from 'react-router-dom';
const cx = classNames.bind(styles);

function Header() {
    const [isFixed, setIsFixed] = useState(false);
    const navbarRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        console.log('Header render');
        const handleScroll = () => {
            if (navbarRef.current) {
                const scrollY = window.scrollY;
                if (scrollY > navbarRef.current.offsetHeight + 80) {
                    setIsFixed(true);

                } else {
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);




    return (
        <header className={cx('wrapper')}>
            <div className={cx('masthead')}>
                <div className={cx('inner-masthead')}>

                    <div className={cx('logo')}>
                        <Link to="/">
                            <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2023/10/logo-dau-nhot-npoil-new-1024x315.png" alt="Logo" />
                        </Link>
                    </div>
                    <div className={cx('left-element')}>
                        <form action="">
                            <div className={cx('selection')}>
                                <select name="" id="">
                                    <option value="">All</option>
                                </select>
                            </div>
                            <div className={cx('input-search')}>
                                <input type="text" placeholder='Tìm kiếm sản phẩm' />
                            </div>
                            <div className={cx('search-btn')}>
                                <button type='submit' >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                </button>
                            </div>
                        </form>
                        <div className={cx('support')}>
                            <div>
                                <img src="https://shop.daunhotnpoil.com/wp-content/uploads/2019/02/icon_03.png" alt="Support icon" />
                            </div>
                            <div className={cx('support-content')}>
                                <p>
                                    <span>Hỗ trợ khách hàng</span>
                                    <br />
                                    <span style={{ color: 'red', fontSize: '1.6rem' }}>1900 75 75 25</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={cx('right-element')}>
                        <ul>
                            <li>
                                <a href="" className={cx('cart-link')}>
                                    <span>Giỏ hàng</span>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </a>
                            </li>
                            <li><a href="">
                                <span>Đăng nhập / Đăng kí</span>
                            </a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div ref={navbarRef} className={cx('navbar', { 'fixed': isFixed })}>
                <div className={cx('inner-navbar')}>

                    <div className={cx('category-nav')}>
                        {location.pathname === '/' && !isFixed ?
                            <>
                                <div className={cx('category-title')} >
                                    <FontAwesomeIcon icon={faBars} style={{ marginRight: '0.9rem' }} />
                                    Danh mục sản phẩm

                                </div>
                                <ul className={cx('category-menu', 'show')}>
                                    {NavItem.map((item, index) => {
                                        return <NavItems items={item} key={index} />
                                    })}
                                </ul>
                            </>

                            :
                            <Tippy
                                interactive
                                placement="bottom-end"
                                render={(attrs) => (
                                    <>
                                        <ul className={cx('category-menu')} {...attrs}>
                                            {NavItem.map((item, index) => {
                                                return <NavItems items={item} key={index} />
                                            })}
                                        </ul>
                                    </>
                                )}>
                                <div className={cx('category-title')} >
                                    <FontAwesomeIcon icon={faBars} style={{ marginRight: '0.9rem' }} />
                                    Danh mục sản phẩm
                                </div>
                            </Tippy>
                        }




                    </div>
                    <div className={cx('sub-nav')}>
                        <ul>
                            <li><Link to="/introduce">GIỚI THIỆU</Link></li>
                            <li>
                                <a href="">
                                    SẢN PHẨM
                                </a>
                            </li>
                            <li><a href="">LIÊN HỆ</a></li>
                            <li><a href="">HỆ THỐNG CỬA HÀNG</a></li>
                            <li><a href="">TIN TỨC</a></li>
                        </ul>
                    </div>
                    <div className={cx('lookup-orders')}  >
                        <a>
                            <span>Tra cứu đơn hàng</span>
                        </a>
                    </div>
                </div>
            </div>

        </header>
    );
}

export default Header;