import React from 'react';
import Cart from '~/cart/'
import CustomerData from '~/checkout'
import Result from '~/reasult'

export default class extends React.Component {

    state = {
        products: getProducts(),
        customerData: {
            customerName: {
                lable: 'Name',
                value: ''
            },
            customerMail: {
                lable: 'E-mail',
                value: ''
            },
            deliveryAddress: {
                lable: 'Delivery address',
                value: ''
            }
        },
        activRoute: 'CART'        
    };

    moveToCart = () => {
        this.setState({activRoute: 'CART'});
    };

    moveToOrder = () => {
        this.setState({activRoute: 'DATA'});
    };

    moveToResult = () => {
        this.setState({activRoute: 'RESULT'});
    };

    onChange = (newQuantity, i) => {
        let newProducts = [...this.state.products];
        let NewProduct = {...this.state.products[i]}
        NewProduct.quantity = newQuantity;
        newProducts[i]=NewProduct;
        this.setState({products: newProducts});
    };

    deleteProduct = (i) => {
        let newProducts = [...this.state.products];
        newProducts.splice(i, 1);
        this.setState({products: newProducts});
    };

    changeCustData = (value, name) => {        
        let customerData = {...this.state.customerData};
        customerData[name] = {...customerData[name], value};        
        this.setState({customerData});        
    };

    render() {
        let Page;
        
        switch (this.state.activRoute) {
            case 'CART':
                Page = <Cart
                            products={this.state.products}
                            moveToOrder={this.moveToOrder}
                            deleteProduct={this.deleteProduct}
                            onChange={this.onChange}
                        />
            break;
            case 'DATA':
                Page = <CustomerData
                            products={this.state.products}
                            moveToCart={this.moveToCart}
                            moveToResult={this.moveToResult}
                            customerData={this.state.customerData}
                            changeCustData={this.changeCustData}
                        />
            break;
            case 'RESULT':
                Page = <Result
                            products={this.state.products}                            
                            customerData={this.state.customerData}
                        />       
            break;
            default:
                <div>404</div>
        }
        
        return (
            <div>
                {Page}
            </div>
        );
    }    
};

function getProducts(){
    return [
        {
            id: 100,
            title: 'Iphone 11',
            price: 800,
            rest: 10,
            quantity: 1
        },
        {
            id: 101,
            title: 'Iphone 11 Pro',
            price: 999,
            rest: 7,
            quantity: 1
        },
        {
            id: 102,
            title: 'Iphone 11 Pro Max',
            price: 1199,
            rest: 10,
            quantity: 1
        },
        {
            id: 103,
            title: 'Samsung S10',
            price: 800,
            rest: 5,
            quantity: 1
        },
        {
            id: 104,
            title: 'Nokia 3310',
            price: 100,
            rest: 200,
            quantity: 1
        },
        {
            id: 105,
            title: 'Huawei p30',
            price: 989,
            rest: 8,
            quantity: 1
        }
    ];
}