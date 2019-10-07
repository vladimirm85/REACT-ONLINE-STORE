import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import CheckoutStore from '~s/checkoutStore.js';
import ProductStore from '~s/productStore.js';
import NotificationsStore from '~s/notificationsStore.js';
import ServerResponseStore from '~s/serverResponseStore.js';

import * as products from '~/requests/products.js';
import * as checkout from '~/requests/checkout.js';
import * as cart from '~/requests/cart.js';


class RootStore {
    constructor() {

      this.requests = {
        products,
        checkout,
        cart
      };

      this.cart = new CartStore(this);
      this.home = new HomeStore(this);
      this.checkout = new CheckoutStore(this);
      this.product = new ProductStore(this);
      this.notifications = new NotificationsStore(this);
      this.serverResponse = new ServerResponseStore(this);
    };
  };

  export default new RootStore();