import React from 'react';
import styles from './app.module.css';
import CartForm from'./orderForm/cartForm/cartForm.js'

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
        let submitForm = renderSubmitForm(this.state.products);

        return (
            <div>                
                {submitForm}
                <CartForm
                    products={this.state.products}
                    deleteProduct={this.deleteProduct}
                    onChange={this.onChange}
                />
            </div>
        );
    }    
}

function renderSubmitForm (products) {
    let totalCount = 0;

    let productsRows = products.map((product, i) => {
        totalCount += product.quantity*product.price;
        return (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.quantity}</td>
                <td>{product.price * product.quantity}</td>
            </tr>
        );
    });
    return (
        <div>
            <h2>Submit</h2>
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Count</td>
                    <td>Total</td>
                </tr>
                {productsRows}
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>{totalCount}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );

}