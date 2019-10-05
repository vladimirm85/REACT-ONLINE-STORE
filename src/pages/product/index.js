import React from 'react';
import { Button, Card, CardColumns, Spinner } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
const {Body, Title, Text} = Card;

class Product extends React.Component {

    state = {
        product: {},
        serverResponseStatus: ''
    };

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.setState({serverResponseStatus: 'pending'});
        this.props.store.requests.products.getProductById(id).then(product => {
            this.setState({product});
        }).finally(() => {
            this.setState({serverResponseStatus: 'fulfilled'});
        });
    };
    
    render () {



        const product = this.state.product;        
        const CartStore = this.props.store.cart;

        return (
            <div>
                <CardColumns>
                    {(this.state.serverResponseStatus === 'pending')
                    ?<Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                    :<Card key={product.id} className="text-center">
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
                                disabled={CartStore.elementInProcess(product.id)}
                            >
                                {CartStore.isCartProduct(product.id) ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Body>
                    </Card>}
                </CardColumns>
            </div>
        )
    };
};

export default withStore(Product);