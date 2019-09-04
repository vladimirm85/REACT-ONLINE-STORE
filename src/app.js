import React from 'react';
import MinMax from './orderForm/mimnax.js';
import DeleteProduct from './orderForm/deleteProduct.js';
import styles from './app.module.css';
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
        
        let Form = renderCartForm(this.state.products, this.deleteProduct, this.onChange);
        
        return (
            <div>
                {Form}
            </div>
        );
    }    
}

function renderCartForm(products, delProdFoo, onChangeFoo) {
    let totalCount = 0;

    let productsRows = products.map((product, i) => {
        totalCount += product.quantity*product.price;
        return (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                    <MinMax
                        quantity={product.quantity}
                        min={1}
                        max={product.rest}
                        onChange={(newQuantity) => {onChangeFoo(newQuantity, i)}}/>
                </td>
                <td>{product.price * product.quantity}</td>
                <td><DeleteProduct deleteProduct={() => {delProdFoo(i)}}/></td>
            </tr>
        );
    });

    return (
        <div>
            <h2>Cart</h2>
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Count</td>
                    <td>Total</td>
                    <td>Delete</td>
                </tr>
                {productsRows}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{totalCount}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <div className="container">
                <Button onClick={() => {onChangeFoo(4, 1)}}>Some change
                </Button>
            </div>
        </div>
    );
}