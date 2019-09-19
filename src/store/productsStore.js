import { observable, computed, action} from "mobx";
import ProductsInCart from '~s/productsInCart.js'

class Products {
    @observable products = getProducts();

    @action addToCard (product) {        
        const index = this.products.findIndex(el => el.id === product.id);
        this.products[index].inCart=true;
        ProductsInCart.addProducts(product.id);

    };

    @action removeFromCard (product) {        
        ProductsInCart.deleteProducts(product.id);

    };
}

export default new Products();

function getProducts(){
    return [
        {
            id: 100,
            title: 'Iphone 11',
            fullName: 'Apple iphone 11',
            price: 800,
            rest: 10,            
            inCart: false,            
        },
        {
            id: 101,
            title: 'Iphone 11 Pro',
            fullName: 'Apple iphone 11 Pro',
            price: 999,
            rest: 7,            
            inCart: false
        },
        {
            id: 102,
            title: 'Iphone 11 Pro Max',
            fullName: 'Apple iphone 11 Pro Max',
            price: 1199,
            rest: 10,            
            inCart: false
        },
        {
            id: 103,
            title: 'Samsung S10',
            fullName: 'Samsung Galaxy S10',
            price: 800,
            rest: 5,            
            inCart: false
        },
        {
            id: 104,
            title: 'Nokia 3310',
            fullName: 'Nokia "Best of the best" 3310',
            price: 100,
            rest: 200,            
            inCart: false
        },
        {
            id: 105,
            title: 'Huawei p30',
            fullName: 'Huawei P30 2019',
            price: 989,
            rest: 8,            
            inCart: false
        },
        {
            id: 106,
            title: 'Sony J9110',
            fullName: 'Sony Xperia 1 J9110 Black',
            price: 900,
            rest: 12,            
            inCart: false
        }
    ];
}