import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

const Pagination = () => {
    const location = useLocation()
    const currentPage = Number(new URLSearchParams(location.search).get('page'));
    const maxPage = 25;
    useEffect(() => {
        console.log('re-renderr');
    }, []);
    return (
        <div className={cx('pagination')}>
            <Link to={`?page=${currentPage - 1 <= 0 ? '1' : currentPage - 1}`}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </Link>
            {(currentPage <= 3) &&
                <>
                    <Link to={`?page=1`}
                        className={cx({ 'current-page': currentPage <= 1 })}>
                        1
                    </Link>
                    <Link to={`?page=${2}`} className={cx({ 'current-page': currentPage === 2 })}>2</Link>
                    <Link to={`?page=${3}`} className={cx({ 'current-page': currentPage === 3 })}>
                        3
                    </Link>
                </>
            }
            {(currentPage > maxPage - 2) &&
                <>
                    <Link to={`?page=${maxPage - 2}`}
                        className={cx({ 'current-page': currentPage === '1' })}>
                        {maxPage - 2}
                    </Link>
                    <Link to={`?page=${maxPage - 1}`}  className={cx({ 'current-page': currentPage === 24 })}>
                        {maxPage - 1}

                    </Link>
                    <Link to={`?page=${maxPage}`} className={cx({ 'current-page': currentPage === 25 })}>
                        {maxPage }
                    </Link>
                </>
            }
            {currentPage > 3 && currentPage <= maxPage - 2 &&
                <>
                    <Link to={`?page=${currentPage - 1 === 0 ? 1 : currentPage - 1}`}
                        className={cx({ 'current-page': currentPage === '1' })}>
                        {currentPage - 1 <= 0 ? 1 : currentPage - 1}
                    </Link>
                    <Link to={`?page=${currentPage}`} className={cx({ 'current-page': currentPage === currentPage && currentPage !== '1' })}>{currentPage === 1 ? 2 : currentPage}</Link>
                    <Link to={`?page=${currentPage + 1}`}>
                        {currentPage === 1 ? 3 : currentPage + 1}
                    </Link>
                    <span>...</span>
                    <Link to={`?page=${maxPage}`}>
                        {maxPage}
                    </Link>


                </>
            }
            <Link to={`?page=${currentPage + 1 <= maxPage ? currentPage + 1 : maxPage}`}>
                <FontAwesomeIcon icon={faChevronRight} />
            </Link>


        </div>
    );
};

export default Pagination;
