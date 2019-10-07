import React from 'react';
import { Button, Card, CardColumns, Spinner } from 'react-bootstrap';
import LoaderComponent from '~c/loaderComponent.js';
import ServerErrorComponent from '~c/serverErrorComponent.js';
import withStore from '~/hocs/withStore.js';
const {Body, Title, Text} = Card;

class Product extends React.Component {

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.props.store.product.getProductById(id);
    };
    
    render () {

        const { cart: CartStore, serverResponse: ServerResponseStore } = this.props.store;
        const product = this.props.store.product.getProduct;        
        
        return (
            <div>
                {(ServerResponseStore.getServerResponseStatus === 'pending')
                ?<LoaderComponent/>
                :(ServerResponseStore.getServerResponseError)
                ?<ServerErrorComponent/>
                :<CardColumns>
                    <Card key={product.id} className="text-center">
                        <Body>
                            <Title>{product.fullName}</Title>
                            <Text>
                            Price: {product.price} <br/>
                            Left in stock: {product.rest}
                            </Text>
                            <Button
                                variant={CartStore.isCartProduct(product.id) ? "warning" : "primary"}
                                onClick={()=>{
                                    CartStore.isCartProduct(product.id)
                                    ? CartStore.removeCartProduct(product.id)
                                    : CartStore.addCartProduct(product);
                                }}
                            >
                                {CartStore.isCartProduct(product.id) ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Body>
                    </Card>
                </CardColumns>}
            </div>
        )
    };
};

export default withStore(Product);