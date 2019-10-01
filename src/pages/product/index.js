import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import withStore from '~/hocs/withStore.js'
const {Body, Title, Text} = Card;

class Product extends React.Component {

    state = {
        product: {}
    };

    componentDidMount() {
        const id = Number(this.props.match.params.id);
        this.props.store.api.products.byId(id).then(product => {
            this.setState({product});
        });
    };

    render () {       

        const product = this.state.product;
        const CartStore = this.props.store.cart;

        return (
            <div>
                <CardColumns>
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
                </CardColumns>
            </div>
        )
    };
};

export default withStore(Product);