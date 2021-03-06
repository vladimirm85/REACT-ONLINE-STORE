import React from 'react';
import LoaderComponent from '~c/loaderComponent.js';
import MinMax from '~c/inputs/mimnax.js';
import LinkButton from '~c/links/button';
import withStore from '~/hocs/withStore.js';
import { Button } from 'react-bootstrap';
import { RoutesMap } from '~/routes';

class Cart extends React.Component {

    clearCart () {
        this.props.store.cartStore.clearCart().catch(error => {});
    };
    
    render() {

        const { cartStore } = this.props.store;

        const productsRows = cartStore.cartsProducts.map((product) => 
            <tr key={product.id}>
                <td>{product.title}</td>
                <td align="right">{product.price}</td>
                <td align="center">
                    <MinMax
                        quantity={product.quantity}
                        min={1}
                        max={product.rest}
                        onChange={(newQuant) => cartStore.updateCartProduct(product.id, newQuant)}
                    />
                </td>
                <td align="right">{product.quantity * product.price}</td>
                <td align="center"><button onClick={() => {cartStore.removeCartProduct(product.id)}}>X</button></td>
            </tr>
        
        );

        return (
            <div>
                {(cartStore.getServerResponseStatus === 'pending')
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
                                <strong>{cartStore.totalPrice}</strong>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div>
                        <LinkButton
                            to={RoutesMap.checkout}
                            className="btn btn-primary"
                            disabled={!cartStore.cartsProductsCnt}
                        >
                            Proceed to checkout
                        </LinkButton>
                        <Button
                            variant="danger"
                            onClick={()=>{this.clearCart()}}
                            disabled={!cartStore.cartsProductsCnt}
                        >
                            Clear cart
                        </Button>
                    </div>
                </div>}
            </div>
        );
    };
};

export default withStore(Cart);

