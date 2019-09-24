import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import DataStore from '~s/dataStore.js';
const {Body, Title, Text} = Card;

class Product extends React.Component {

    state = {
        product: {},
        cartsProducts: []
    };

    componentDidMount() {
        const id = Number(this.props.match.params.id);        
        this.setState({product: DataStore.getProductById(id)});        
        this.setState({cartsProducts: [...DataStore.cartsProducts]});            
    };

    isCartProduct = id => !!this.state.cartsProducts.find(product => product.id === id);

    removeFromCart(id) {
        const newCartsProducts = [...this.state.cartsProducts];
        const index = newCartsProducts.findIndex(product => product.id === id);
        newCartsProducts.splice(index, 1);
        this.setState({cartsProducts: newCartsProducts});
        DataStore.removeFromCart(id);
    };

    addToCart(product) {
        const newCartsProducts = [...this.state.cartsProducts];
        const cartProduct = {
            id: product.id,
            title: product.title,            
            price: product.price,
            rest: product.rest,
            quantity: 1
        };
        newCartsProducts.push(cartProduct);
        this.setState({cartsProducts: newCartsProducts});
        DataStore.addToCart(cartProduct);
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
                                variant={this.isCartProduct(product.id) ? "warning" : "primary"}
                                onClick={()=>{
                                    this.isCartProduct(product.id)
                                    ? this.removeFromCart(product.id)
                                    : this.addToCart(product);
                                }}
                            >
                                {this.isCartProduct(product.id) ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Body>
                    </Card>
                </CardColumns>
            </div>
        )
    };
};

export default Product;