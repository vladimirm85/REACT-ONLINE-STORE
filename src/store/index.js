import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import CheckoutStore from '~s/checkoutStore.js';

import * as products from '~/requests/products.js';
import * as cart from '~/requests/cart.js';


class RootStore {
    constructor() {

      this.requests = {
        products,
        cart
      };

      this.cart = new CartStore(this);
      this.home = new HomeStore(this);
      this.checkout = new CheckoutStore(this);
    };
  };

  export default new RootStore();