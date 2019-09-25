import React from 'react';
import {observer} from 'mobx-react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import DataStore from '~s/dataStore.js';
import CartStore from '~s/cartStore.js';
const {Body, Title, Text} = Card;

@observer class Product extends React.Component {

    state = {
        product: {}
    };

    componentDidMount() {
        const id = Number(this.props.match.params.id);        
        this.setState({product: DataStore.getProductById(id)});        
        CartStore.getCartsProducts();            
    };

    render () {       

        const product = this.state.product;

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

export default Product;