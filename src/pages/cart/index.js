import React from 'react';
import LoaderComponent from '~c/loaderComponent.js';
import MinMax from '~c/inputs/mimnax.js';
import LinkButton from '~c/links/button';
import withStore from '~/hocs/withStore.js';
import { Button } from 'react-bootstrap';
import { RoutesMap } from '~/routes';

class Cart extends React.Component {
    
    render() {

        const { cart: CartStore, serverResponse: ServerResponseStore } = this.props.store;

        const productsRows = CartStore.cartsProducts.map((product) => 
            <tr key={product.id}>
                <td>{product.title}</td>
                <td align="right">{product.price}</td>
                <td align="center">
                    <MinMax
                        quantity={product.quantity}
                        min={1}
                        max={product.rest}
                        onChange={(newQuant) => CartStore.updateCartProduct(product.id, newQuant)}
                    />
                </td>
                <td align="right">{product.quantity * product.price}</td>
                <td align="center"><button onClick={() => {CartStore.removeCartProduct(product.id)}}>X</button></td>
            </tr>
        
        );

        return (
            <div>
                {(ServerResponseStore.getServerResponseStatus === 'pending')
                ?<LoaderComponent/>
                :<div>
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
                            <td colSpan="3">
                                <strong>Total price</strong>
                            </td>
                            <td colSpan="2" align="right">
                                <strong>{CartStore.totalPrice}</strong>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <LinkButton
                            to={RoutesMap.checkout}
                            className="btn btn-primary"
                        >
                            Proceed to checkout
                        </LinkButton>
                        <Button
                            variant="danger"
                            onClick={()=>{CartStore.clearCart()}}
                        >
                            Clear cart
                        </Button>
                    </div>
                </div>}
            </div>
        );
    }
};

export default withStore(Cart);

