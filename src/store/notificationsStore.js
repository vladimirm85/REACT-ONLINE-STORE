import {observable, computed, action} from 'mobx';

export default class NotificationsStore {
    
    @observable notifications = {};

    autoIncrement = 0;

    notificationMessages = {
        getProducts: 'Can\'t load products data. Please try again!',
        getProductById: 'Can\'t load product information. Please try again!',
        getCartProducts: 'Can\'t load cart. Please try again!',
        addCartProduct: 'Can\'t add product to cart. Please try again!',
        removeCartProduct: 'Can\'t remove product from cart. Please try again!',
        updateCartProduct: 'Can\'t change product quantity. Please try again!',
        clearCart: 'Can\'t clear cart. Please try again!',
        placeOrder: 'Can\'t place order. Please try again!'
    };

    constructor(rootStore){
        this.rootStore = rootStore;
    };

    @computed get notificationsList(){        
        return Object.values(this.notifications);
    };

    @action addNotification(message, type = 'error', timeToAutoHide = 5000){
        this.notifications[++this.autoIncrement] = {
            id: this.autoIncrement,
            message: this.notificationMessages[message],
            type
        };

        if(timeToAutoHide !== null){
            const carringId = this.autoIncrement;

            setTimeout(() => {
                this.removeNotification(carringId);
            }, timeToAutoHide);
        };
    };

    @action removeNotification(id){
        if(id in this.notifications){
            delete this.notifications[id];
        };
    };
};