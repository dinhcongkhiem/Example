import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
// import { useAuth } from './AuthContext';
// import LoginModal from './LoginModal'; // Giả sử bạn đã tạo modal đăng nhập
import { ModalAuthen } from '../../layouts/component/Modal';
import { resolveMotionValue } from 'framer-motion';

const userRole = 'user'

const PrivateRoute = ({ children }) => {
    // const { isAuthenticated } = useAuth();
    const [isAuthenticated] = useState(true)
    const [isOpenModalAuthen, setOpenModalAuthen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            setOpenModalAuthen(true);
        } else {
            if(userRole !== 'user') {
                navigate('/')
            }
            setOpenModalAuthen(false);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <>
                <ModalAuthen setOpen={setOpenModalAuthen} isOpen={isOpenModalAuthen} />
            </>
        );
    }
    if (userRole !== 'user') {
        return null
    }
    return children;
};

const AdminRoute = ({ children }) => {
    // const { isAuthenticated } = useAuth();
    const [isAuthenticated] = useState(true)
    const [isOpenModalAuthen, setOpenModalAuthen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            setOpenModalAuthen(true);
        } else {
            if(userRole !== 'admin') {
                navigate('/')
            }
            setOpenModalAuthen(false);
        }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
        return (
            <>
                <ModalAuthen setOpen={setOpenModalAuthen} isOpen={isOpenModalAuthen} />
            </>
        );
    }
    if (userRole !== 'admin') {
        return null
    }
    return children;
};




export {PrivateRoute, AdminRoute};
