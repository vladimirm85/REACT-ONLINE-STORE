
class Products {
    products = getProducts();

    cartsProducts = [];

    getCartsProducts () {        
        return this.cartsProducts;
    };

    addToCart (id) {        
        const product = this.products.find(product => product.id === id);
        
        const cartProduct = {
            id: product.id,
            title: product.title,            
            price: product.price,
            rest: product.rest,
            quantity: 1
        };
        
        this.cartsProducts.push(cartProduct);
    };

    removeFromCart (id) {
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts.splice(index, 1);
    };

    changeQuant (id, newQuant) {
        const index = this.cartsProducts.findIndex(product => product.id === id);
        this.cartsProducts[index].quantity = newQuant;
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
            rest: 10
        },
        {
            id: 101,
            title: 'Iphone 11 Pro',
            fullName: 'Apple iphone 11 Pro',
            price: 999,
            rest: 7
        },
        {
            id: 102,
            title: 'Iphone 11 Pro Max',
            fullName: 'Apple iphone 11 Pro Max',
            price: 1199,
            rest: 10
        },
        {
            id: 103,
            title: 'Samsung S10',
            fullName: 'Samsung Galaxy S10',
            price: 800,
            rest: 5
        },
        {
            id: 104,
            title: 'Nokia 3310',
            fullName: 'Nokia "Best of the best" 3310',
            price: 100,
            rest: 200
        },
        {
            id: 105,
            title: 'Huawei p30',
            fullName: 'Huawei P30 2019',
            price: 989,
            rest: 8
        },
        {
            id: 106,
            title: 'Sony J9110',
            fullName: 'Sony Xperia 1 J9110 Black',
            price: 900,
            rest: 12
        }
    ];
}