import Cart from '~p/cart/';
import Checkout from '~p/checkout';
import Home from '~p/home';
import Product from '~p/product';
import E404 from '~p/error404';

const routes = [
    {
        name: 'home',
        url: '/',
        component: Home,
        exact: true
    },
    {
        name: 'cart',
        url: '/cart',
        component: Cart,
        exact: true
    },
    {
        name: 'product',
        url: '/product/:id',
        component: Product,
        exact: true
    },
    {
        name: 'checkout',
        url: '/checkout',
        component: Checkout,
        exact: true
    },
    {
        url: '*',
        component: E404,
    }
];

const UrlBuild = function (name, params) {
    
    if(!RoutesMap.hasOwnProperty(name)) {
        return null;
    };
    
    let url = RoutesMap[name];

    for (let key in params) {
        url = url.replace(':' + key, params[key]);
    }
    
    return url;
};

const RoutesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')) {
        RoutesMap[route.name] = route.url;
    };
});

export default routes;
export { RoutesMap, UrlBuild };