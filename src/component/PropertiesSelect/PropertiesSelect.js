// PropertiesSelect.jsx
import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import style from './PropertiesSelect.module.scss';
import { useEffect } from "react";

const cx = classNames.bind(style);

function PropertiesSelect({ properties, selectedOptions, setSelectedOptions }) {
    useEffect(() => {
        console.log('re-render');
    }, []);

    return (
        <div className={cx('wrapper')}>
            {properties.map((property) => (
                <div key={property.name} className={cx('property')}>
                    <p className={cx('label')}>
                        {property.name}
                    </p>
                    <div className={cx('options')}>
                        {property.options.map((option) => (
                            <button
                                key={option}
                                className={cx('prop-value', { 
                                    'selected': selectedOptions[property.id] === option 
                                })}
                                onClick={() => {
                                    setSelectedOptions((prev) => ({
                                        ...prev,
                                        [property.id]: selectedOptions[property.id] === option ? null : option
                                    }));
                                }}
                            >
                                {option.startsWith('#') ?
                                    <span style={{ backgroundColor: option }}></span> :
                                    <p>{option}</p>
                                }
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

PropertiesSelect.propTypes = {
    properties: PropTypes.array.isRequired,
    selectedOptions: PropTypes.object.isRequired,
    setSelectedOptions: PropTypes.func.isRequired
};

export default PropertiesSelect;
