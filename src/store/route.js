import React from 'react';
import Cart from '~p/cart/'
import Checkout from '~p/checkout'
import Result from '~p/reasult'
import { observable, action} from "mobx";

class Route {
    routes = {
        CART: () => <Cart/>,
        CHECKOUT: () => <Checkout/>,
        RESULT: () => <Result/>
    };

    @observable activRoute = 'CART';

    @observable page () {return this.routes[this.activRoute]()};

    @action change (newRoute) {this.activRoute = newRoute};
}

export default new Route();
