import React from 'react';
import styles from './app.module.css';
import CartForm from './orderForm/cartForm/cartForm.js'
import ProductsForm from './orderForm/checkOut/productsForm.js'
import CustomerData from './orderForm/checkOut/customerData.js'
import Congrat from './orderForm/congrat/congrat.js'
import { Button } from 'react-bootstrap'


export default class extends React.Component {

    state = {
        products: [
            {
                id: 100,
                title: 'Ipnone 200',
                price: 12000,
                rest: 10,
                quantity: 1
            },
            {
                id: 101,
                title: 'Samsung AAZ8',
                price: 22000,
                rest: 5,
                quantity: 1
            },
            {
                id: 103,
                title: 'Nokia 3310',
                price: 5000,
                rest: 2,
                quantity: 1
            },
            {
                id: 105,
                title: 'Huawei ZZ',
                price: 15000,
                rest: 8,
                quantity: 1
            }
        ],
        page: 'CART'        
    }

    pageChange = (pageName) => {
        this.setState({page: pageName})
    }

    onChange = (newQuantity, i) => {
        let newProducts = [...this.state.products];
        let NewProduct = {...this.state.products[i]}
        NewProduct.quantity = newQuantity;
        newProducts[i]=NewProduct;
        this.setState({products: newProducts});
    }

    deleteProduct = (i) => {
        let newProducts = [...this.state.products];
        newProducts.splice(i, 1);
        this.setState({products: newProducts});
    }

    render() {
        let Page;
        
        switch (this.state.page) {
            case 'CART':
                Page = () => {
                    return (
                        <CartForm
                            products={this.state.products}
                            page={this.state.page}
                            pageChange={this.pageChange}
                            deleteProduct={this.deleteProduct}
                            onChange={this.onChange}                            
                        />
                    )
                };
                break;
            case 'DATA':
                Page = () => {
                    return (
                        <CustomerData
                            products={this.state.products}
                            pageChange={this.pageChange}
                        />
                    )
                };
                break;
            default:
                Page = () => {
                    return (
                        <Congrat/>
                    )
                };
                break;         
        }
        
        return (
            <div>
                <Page/>
            </div>
        );
    }    
}