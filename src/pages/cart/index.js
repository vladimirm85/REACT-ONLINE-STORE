import React from 'react';
import MinMax from '~c/mimnax.js'
import CartStore from '~s/products.js'
import Route from '~s/route.js'
import { Button } from 'react-bootstrap'
import {observer} from 'mobx-react'

const Cart = observer (() => {

    let productsRows = CartStore.products.map((product, i) => {
        
        return (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td align="right">{product.price}</td>
                <td align="center">
                    <MinMax
                        quantity={product.quantity}
                        min={1}
                        max={product.rest}
                        onChange={CartStore.changeOn[i]}
                    />
                </td>
                <td align="right">{product.price * product.quantity}</td>
                <td align="center"><button onClick={() => {CartStore.delete(i)}}>X</button></td>
            </tr>
        );
    });

    return (
        <div>
            <h2>Cart</h2>
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td align="center">Title</td>
                    <td align="center">Price</td>
                    <td align="center">Quantity</td>
                    <td align="center">Total</td>
                    <td align="center">Delete</td>
                </tr>
                {productsRows}
                <tr>
                    <td colspan="3"><strong>Total</strong></td>
                    <td colspan="2" align="right"><strong>{CartStore.total}</strong></td>
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

