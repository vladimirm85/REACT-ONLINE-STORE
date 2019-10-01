import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import CheckoutStore from '~s/checkoutStore.js';

import * as products from '~/api/products.js';
import * as cart from '~/api/cart.js';


class RootStore {
    constructor() {

      this.api = {
        products,
        cart
      };

      this.cart = new CartStore(this);
      this.home = new HomeStore(this);
      this.checkout = new CheckoutStore(this);
    };
  };

  export default new RootStore();