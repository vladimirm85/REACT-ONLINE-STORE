import { observable, computed, action } from "mobx";

export default class CartStore {

    @observable cartsProducts = [];

    @observable serverResponseStatus = '';

    constructor (RootStore) {
        this.RootStore = RootStore;
    };

    @action getCartProducts() {
        this.serverResponseStatus = 'pending';
        this.RootStore.cartRequests.getCartProducts().then( cartsProducts => {
                this.cartsProducts = cartsProducts;
                this.serverResponseStatus = 'fulfilled';
            }).catch( text => {
                console.log('Error: ' + text);
                this.RootStore.notificationsStore.addNotification('getCartProducts');
                this.serverResponseStatus = 'rejected';
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

        this.serverResponseStatus = 'pending';
        this.RootStore.cartRequests.addCartProduct(cartProduct).then( cartProduct => {
                this.cartsProducts.push(cartProduct);
                this.serverResponseStatus = 'fulfilled';
            }).catch( text => {
                console.log('Error: ' + text);
                this.RootStore.notificationsStore.addNotification('addCartProduct');
                this.serverResponseStatus = 'rejected';
        });
    };
    
    @action removeCartProduct (id) {
        this.serverResponseStatus = 'pending';
        this.RootStore.cartRequests.removeCartProduct(id).then( success => {
                if (success) {
                    const index = this.cartsProducts.findIndex( product => product.id === id);
                    this.cartsProducts.splice(index, 1);
                    this.serverResponseStatus = 'fulfilled';
                };
            }).catch( text => {
                console.log('Error: ' + text);
                this.RootStore.notificationsStore.addNotification('removeCartProduct');
                this.serverResponseStatus = 'rejected';
        });
    };

    @action updateCartProduct (id, newQuant) {

        const index = this.cartsProducts.findIndex(product => product.id === id);
        const updatedProduct = {...this.cartsProducts[index]};
        updatedProduct.quantity = newQuant;

        this.serverResponseStatus = 'pending';
        this.RootStore.cartRequests.updateCartProduct(updatedProduct).then( cartProduct => {
                this.cartsProducts[index] = cartProduct;
                this.serverResponseStatus = 'fulfilled';
            }).catch( text => {
                console.log('Error: ' + text);
                this.RootStore.notificationsStore.addNotification('updateCartProduct');
                this.serverResponseStatus = 'rejected';
        });
    };

    @action clearCart () {
        return new Promise ((resolve, reject) => {
            this.serverResponseStatus = 'pending';
            this.RootStore.cartRequests.clearCart().then( success => {                
                    if (success) {
                        this.cartsProducts = [];
                        this.serverResponseStatus = 'fulfilled';
                        resolve(true);
                    };
                    reject('Сlear Cart fail');
                }).catch( text => {
                    console.log('Error: ' + text);
                    this.RootStore.notificationsStore.addNotification('clearCart');
                    this.serverResponseStatus = 'rejected';
                    reject(text);
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

    @computed get getServerResponseStatus() {
        return this.serverResponseStatus;
    };
};