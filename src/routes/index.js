import Cart from '~p/cart/';
import Checkout from '~p/checkout';
import Result from '~p/reasult';
import E404 from '~p/error404'

const routes = [
    {
        name: 'home',
        url: '/',
        component: Cart,
        exact: true
    },
    {
        name: 'checkout',
        url: '/checkout',
        component: Checkout,
        exact: true
    },
    {
        name: 'result',
        url: '/result',
        component: Result,
        exact: true
    },
    {
        url: '**',
        component: E404,
    }
];

const RoutesMap = {};

routes.forEach((route) => {
    if(route.hasOwnProperty('name')) {
        RoutesMap[route.name] = route.url;
    };
});

export default routes;
export { RoutesMap };