import React from 'react';
import { Button, Card, CardColumns, Spinner } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
const {Body, Title, Text} = Card;

class Product extends React.Component {

    state = {
        product: {},
        serverResponseStatus: '',
        serverResponseError: false,
        errorHandled: false
    }

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        
        this.setState({serverResponseStatus: 'pending'});
        this.props.store.requests.products.getProductById(id).then(product => {
                this.setState({
                    product,
                    serverResponseError: false,
                    errorHandler: false
                });
            }).catch(() => {
                this.setState({serverResponseError: true});
            }).finally(() => {
                this.setState({serverResponseStatus: 'fulfilled'});
        });
    };
    
    render () {

        const product = this.state.product;        
        const CartStore = this.props.store.cart;

        //я не могу обратиться к объектам стора которые New() в componentDidMount
        // поэтому приходится делать это тут, что явно костыль
        // это и заставило написать для продукта стор
        // кроме того setState в componentDidMount = Warning memory leak
        if (this.state.serverResponseError && !this.state.errorHandler) {
            this.props.store.notifications.addNotification('getProductById');
            this.setState({errorHandled: true});
        }

        return (
            <div>
                {(this.state.serverResponseStatus === 'pending')
                ?<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :(this.state.serverResponseError)
                ?<div>serverResponseError</div>
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