// Pages
import {
    Contact, Home, Introduce, Product, ProductDetail,
    UserInfo, ChangePassword, Cart,
    Payment, PaymentDetail, OrderManagement
} from '../page'

import DefaultLayout from '../layouts/DefaultLayout'
// Public routes
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/product", component: Product },
    { path: "/introduce", component: Introduce },
    { path: "/contact", component: Contact },
    { path: "/product-detail", component: ProductDetail },
];

const privateRoutes = [
    { path: "/profile/info", component: UserInfo },
    { path: "/profile/pass", component: ChangePassword },
    { path: "/cart", component: Cart, layout : DefaultLayout },
    { path: "/payment", component: Payment, layout : DefaultLayout },
    { path: "/payment-detail", component: PaymentDetail, layout : DefaultLayout },
];

const adminRoutes = [
    {path: "/admin/orders", component: OrderManagement}
]

export { publicRoutes, privateRoutes, adminRoutes};
