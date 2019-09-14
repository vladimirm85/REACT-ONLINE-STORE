import React from 'react';
import MinMax from '~c/mimnax.js'
import { Button } from 'react-bootstrap'
import {observer} from 'mobx-react'
import cartStore from '~s/products.js'
import Route from '~s/route.js'


const Cart = observer (() => {

    let productsRows = cartStore.products.map((product, i) => {
        
        return (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>
                    <MinMax
                        quantity={product.quantity}
                        min={1}
                        max={product.rest}
                        onChange={(newQuantity) => {cartStore.changeQuant(i, newQuantity)}}/>
                </td>
                <td>{product.price * product.quantity}</td>
                <td><button onClick={() => {cartStore.delete(i)}}>X</button></td>
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
                    <td>{cartStore.total}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
            <div className="container">
                <Button onClick={() => {Route.change('CHECKOUT')}}>Proceed to checkout
                </Button>
            </div>
        </div>
    );
})

export default Cart;

