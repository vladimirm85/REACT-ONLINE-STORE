import React from 'react';
import { Button, Card, CardColumns, Spinner } from 'react-bootstrap';
import LoaderComponent from '~c/loaderComponent.js';
import E404 from '~c/404.js';
import withStore from '~/hocs/withStore.js';
const {Body, Title, Text} = Card;

class Product extends React.Component {

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.props.store.productStore.getProductById(id);
    };
    
    render () {

        const { cartStore, productStore } = this.props.store;
        const product = this.props.store.productStore.getProduct;        
        
        return (
            <div>
                {(productStore.serverResponseStatus === 'pending' ||
                  cartStore.serverResponseStatus === 'pending')
                ?<LoaderComponent/>
                :(productStore.serverResponseStatus === 'rejected')
                ?<E404/>
                :<CardColumns>
                    <Card key={product.id} className="text-center">
                        <Body>
                            <Title>{product.fullName}</Title>
                                <Text>
                                    Price: {product.price} <br/>
                                    Left in stock: {product.rest}
                                </Text>
                            <Button
                                variant={cartStore.isCartProduct(product.id) ? "warning" : "primary"}
                                onClick={()=>{
                                    cartStore.isCartProduct(product.id)
                                    ? cartStore.removeCartProduct(product.id)
                                    : cartStore.addCartProduct(product);
                                }}
                            >
                                {cartStore.isCartProduct(product.id) ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Body>
                    </Card>
                </CardColumns>}
            </div>
        )
    };
};

export default withStore(Product);