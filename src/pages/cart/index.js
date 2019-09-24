import React from 'react';
import MinMax from '~c/inputs/mimnax.js';
import CartStore from '~s/cartStore.js';
import {observer} from 'mobx-react';
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';

@observer class Cart extends React.Component {

    componentDidMount() {
        CartStore.getCartsProducts();
    };

    render() {

        const productsRows = CartStore.cartsProducts.map((product) => 
            <tr key={product.id}>
                <td>{product.title}</td>
                <td align="right">{product.price}</td>
                <td align="center">
                    <MinMax
                        quantity={product.quantity}
                        min={1}
                        max={product.rest}
                        onChange={(newQuant) => CartStore.updateProduct(product.id, newQuant)}
                    />
                </td>
                <td align="right">{product.quantity * product.price}</td>
                <td align="center"><button onClick={() => {CartStore.removeFromCart(product.id)}}>X</button></td>
            </tr>
        
        );
    
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
                        <td colSpan="3"><strong>Total price</strong></td>
                        <td colSpan="2" align="right"><strong>{CartStore.totalPrice}</strong></td>
                    </tr>
                    </tbody>
                </table>
                <div>
                    <Link to={RoutesMap.checkout} className="btn btn-primary">Proceed to checkout</Link>
                </div>
            </div>
        );
    }
};

export default Cart;

