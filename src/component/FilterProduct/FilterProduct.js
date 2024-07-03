import { memo, useRef, useState } from 'react';
import Slider, { Range } from 'rc-slider'
import classNames from 'classnames/bind';

import style from './FilterProduct.module.scss'
import CheckBox from '../CheckBox';
const cx = classNames.bind(style);
function FilterProduct({ isShow, setShow }) {
    const [valueRangeSlider, setValueRangeSlider] = useState([0, 5000000]);
    const [listWeight, setListWeight] = useState([
        { 'value': '0.5Kg', 'checked': false },
        { 'value': '1Kg', 'checked': false },
        { 'value': '100ml', 'checked': false },
        { 'value': '1L', 'checked': false }
    ]);
    const filterProductRef = useRef();
    const hanldRangeSlider = value => { setValueRangeSlider(value) }
    const formatNumberVN = (number) => {
        let formattedNumber = new Intl.NumberFormat('vn-VN').format(number);
        return formattedNumber.replace(/,/g, '.');
    }

    const handleClose = (e) => {
        if (!filterProductRef.current.contains(e.target) && isShow !== undefined) {
            setShow(false)
        }
    }
    const handleChecked = (index) => {
        setListWeight((prevListWeight) => {
            return prevListWeight.map((item, i) => 
                i === index ? { ...item, checked: !item.checked } : item
            );
        });
    }
    console.log("re-render");


    return (
        <div className={cx('wrapper', { 'isShow': isShow, 'isFixed': isShow !== undefined })}
            onClick={handleClose}>
            <div className={cx('filter-product')} ref={filterProductRef}>
                <div className={cx('filter-price')}>
                    <h4>Lọc theo giá</h4>
                    <div className={cx('range-values')}>
                        <p><span className={cx('value')}>{formatNumberVN(valueRangeSlider[0])}</span><span className={cx('currency')}>Đ</span></p>
                        <span>-</span>
                        <p><span className={cx('value')}>{formatNumberVN(valueRangeSlider[1])}</span><span className={cx('currency')}>Đ</span></p>
                    </div>

                    <div className={cx('range-slider')}>
                        <Slider range min={0} max={20000000} onChange={hanldRangeSlider} defaultValue={[0, 5000000]} onChangeComplete={() => console.log("calll api")} />
                    </div>
                </div>

                <div className={cx('filter-other')}>
                    <h4>Trọng lượng</h4>
                    <div>
                        <ul className={cx('weight')}>
                            {listWeight.map((weight, index) => {
                                return (
                                    <li onClick={() => handleChecked(index)} key={index}>
                                        <CheckBox checked={listWeight[index].checked} />
                                        <p>{weight.value}</p>
                                    </li>
                                )
                            })}


                        </ul>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default memo(FilterProduct);