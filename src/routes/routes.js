// Pages
import { Contact,Home, Introduce,Product, Shop } from '../page'

// Public routes
const publicRoutes = [
    { path: "/", component: Home },
    { path: "/product", component: Home },
    { path: "/introduce", component: Introduce },
    

 
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
