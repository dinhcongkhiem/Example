import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faFilter } from "@fortawesome/free-solid-svg-icons";

import style from './Product.module.scss'
import FilterProduct from "../../component/FilterProduct/FilterProduct";
import SectionProduct from '../../component/SectionProduct'
import { products } from "./fakeData";
import Pagination from "../../component/Pagination/Pagination";
import Select from "react-select";
const cx = classNames.bind(style)

function Product() {
    const [showFilterSideBar, setShowFilterSideBar] = useState(false);
    const [orderBy, setOrderBy] = useState(  { value: "date", label: 'Mới nhất' });
    const optionsOrderby = [
        { value: "menu_order", label: 'Thứ tự mặc định' },
        { value: "popularity", label: 'Thứ tự theo mức độ phổ biến' },
        { value: "rating", label: 'Thứ tự theo điểm đánh giá' },
        { value: "date", label: 'Mới nhất' },
        { value: "price", label: 'Thứ tự theo giá: thấp đến cao' },
        { value: "price-desc", label: 'Thứ tự theo giá: cao xuống thấp' }
    ]

    useEffect(() => {
        console.log('re-render');
        
    }, [])


    return (
        <div className={cx('wrapper')}>
            <FilterProduct isShow={showFilterSideBar} setShow={setShowFilterSideBar} />
            <div className={cx('page-title')}>
                <div className={cx('title')}>
                    <h1>Cửa hàng</h1>
                    <div className={cx('path')}>
                        <a href="">Trang chủ</a>
                        <span className={cx('divide')}>/</span>
                        <a href="">DemoDemo</a>
                        <span className={cx('divide')}>/</span>
                        <p>Current</p>
                    </div>
                </div>
                <h3 className={cx({ 'isShow': showFilterSideBar })} onClick={() => setShowFilterSideBar(true)}>
                    <FontAwesomeIcon icon={faFilter} className={cx('icon-filter')} />
                    Lọc
                </h3>

                <div className={cx('order')}>

                    <p>Hiển thị 1-20 của 50 kết quả</p>
                    <Select
                        options={optionsOrderby}
                        value={orderBy}
                        onChange={setOrderBy}
                        isSearchable={false}
                        placeholder="Sắp xếp..."
                        className={cx('orderby-select')}
                    />

                </div>
            </div>
            <SectionProduct category={null} products={products} />
            <Pagination />
        </div>
    );
}

export default Product;