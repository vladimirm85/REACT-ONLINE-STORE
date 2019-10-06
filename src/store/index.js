import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import CheckoutStore from '~s/checkoutStore.js';
import AppStore from '~s/appStore.js';
import NotificationsStore from '~s/notificationsStore.js';

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
      this.app = new AppStore(this);
      this.notifications = new NotificationsStore(this);
    };
  };

  export default new RootStore();