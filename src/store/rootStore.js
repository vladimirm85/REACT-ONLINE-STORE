import CartStore from '~s/cartStore.js';
import HomeStore from '~s/homeStore.js';
import CheckoutStore from '~s/checkoutStore.js';


class RootStore {
    constructor() {
      this.cart = new CartStore(this);
      this.home = new HomeStore(this);
      this.checkout = new CheckoutStore(this);
    };
  };

  export default new RootStore();