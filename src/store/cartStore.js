import { observable, computed, action } from "mobx";

export default class CartStore {

    @observable cartsProducts = [];

    constructor (RootStore) {
        this.RootStore = RootStore;
        this.requests = this.RootStore.requests;        
    };

    @action getCartProducts() {
        this.RootStore.serverResponse.setServerResponseStatus('pending');
        this.requests.cart.getCartProducts().then( cartsProducts => {
                this.cartsProducts = cartsProducts;
            }).catch(() => {
                this.RootStore.notifications.addNotification('getCartProducts');
            }).finally(() => {
                this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
        });
    };
    
    @action addCartProduct (product) {
        
        const cartProduct = {
            id: product.id,
            title: product.title,            
            price: product.price,
            rest: product.rest,
            quantity: 1
        };

        this.RootStore.serverResponse.setServerResponseStatus('pending');
        this.requests.cart.addCartProduct(cartProduct).then( cartProduct => {
                this.cartsProducts.push(cartProduct);
            }).catch(() => {
                this.RootStore.notifications.addNotification('addCartProduct');
            }).finally(() => {
                this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
        });
    };
    
    @action removeCartProduct (id) {
        this.RootStore.serverResponse.setServerResponseStatus('pending');
        this.requests.cart.removeCartProduct(id).then( success => {
                if (success) {
                    const index = this.cartsProducts.findIndex(product => product.id === id);
                    this.cartsProducts.splice(index, 1);
                };
            }).catch(() => {
                this.RootStore.notifications.addNotification('removeCartProduct');
            }).finally(() => {
                this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
        });
    };

    @action updateCartProduct (id, newQuant) {

        const index = this.cartsProducts.findIndex(product => product.id === id);
        const updatedProduct = {...this.cartsProducts[index]};
        updatedProduct.quantity = newQuant;

        this.RootStore.serverResponse.setServerResponseStatus('pending');
        this.requests.cart.updateCartProduct(updatedProduct).then( cartProduct => {
                this.cartsProducts[index] = cartProduct;
            }).catch(() => {
                this.RootStore.notifications.addNotification('updateCartProduct');
            }).finally(() => {
                this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
        });
    };

    @action clearCart () {
        return new Promise ((resolve, reject) => {
            this.RootStore.serverResponse.setServerResponseStatus('pending');
            this.requests.cart.clearCart().then((success) => {                
                    if (success) {
                        this.cartsProducts = [];
                        resolve(true);
                    };
                    reject('Сlear Cart fail');
                }).catch(() => {
                    this.RootStore.notifications.addNotification('clearCart');
                    reject('Сlear Cart fail');
                }).finally(() => {
                    this.RootStore.serverResponse.setServerResponseStatus('fulfilled');
            });
        });
    };
    
    @computed get isCartProduct() {
        return id => this.cartsProducts.some(product => product.id === id);
    };

    @computed get totalPrice() {
        let total = 0;
        this.cartsProducts.forEach((product) => {
            total += product.quantity*product.price;
        });
        return total;
    };

    @computed get cartsProductsCnt () {
        return this.cartsProducts.length;
    };
};