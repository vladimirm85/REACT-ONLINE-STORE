import React from 'react';
import cartStore from '~s/products.js'

const submitForm = () => {
    let totalCount = 0;

    let productsRows = cartStore.products.map((product) => {
        totalCount += product.quantity*product.price;
        return (
            <tr key={product.id}>
                <td>{product.title}</td>
                <td align="right">{product.price}</td>
                <td align="center">{product.quantity}</td>
                <td align="right">{product.price * product.quantity}</td>
            </tr>
        );
    });
    return (
        <div>
            <table className="table table-bordered">
                <tbody>
                <tr>
                    <td align="center">Title</td>
                    <td align="center">Price</td>
                    <td align="center">Quantity</td>
                    <td align="center">Total</td>
                </tr>
                {productsRows}
                <tr>
                    <td colSpan="3"><strong>Total</strong></td>
                    <td align="right"><strong>{totalCount}</strong></td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};


export default submitForm;