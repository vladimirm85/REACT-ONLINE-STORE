import React from 'react';
import PropTypes from 'prop-types';
import MinMax from './mimnax.js'
import { Button } from 'react-bootstrap'

function CartForm (props) {
    let totalCount = 0;

    let productsRows = props.products.map((product, i) => {
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
                        onChange={(newQuantity) => {props.onChange(newQuantity, i)}}/>
                </td>
                <td>{product.price * product.quantity}</td>
                <td><button onClick={() => {props.deleteProduct(i)}}>X</button></td>
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
                <Button onClick={() => {props.onChange(4, 1)}}>Some change
                </Button>
            </div>
        </div>
    );
};

CartForm.propTypes = {
    products: PropTypes.array.isRequired,
    deleteProduct: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

CartForm.propTypes = {
    deleteProduct: function(){},
    onChange: function(){}    
}

export default CartForm;