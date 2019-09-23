import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import { toJS } from "mobx";
import {observer} from 'mobx-react';
import HomeStore from '~s/homeStore.js';
const {Body, Title, Text} = Card;

@observer class Home extends React.Component {

    componentDidMount() {
        //не работает если заходить сразу на продукт, если после хомяка - работает
        HomeStore.getData();
    };

    render () {

        const ID = this.props.match.params.id
        const product = toJS(HomeStore.products.find(product => product.id == ID));

        return (
            <div>
                <CardColumns>
                    <Card key={product.id} className="text-center">
                        <Body>
                            <Title>{product.fullName}</Title>
                            <Text>
                            Price: {product.price} <hr/>
                            Left in stock: {product.rest}
                            </Text>
                            <Button
                                variant={HomeStore.isCartProduct(product.id) ? "warning" : "primary"}
                                onClick={()=>{
                                    HomeStore.isCartProduct(product.id)
                                    ? HomeStore.removeFromCart(product.id)
                                    : HomeStore.addToCart(product.id);
                                }}
                            >
                                {HomeStore.isCartProduct(product.id) ? "Delete from cart" : "Add to cart"}
                            </Button>
                        </Body>
                    </Card>
                </CardColumns>
            </div>
        )
    };
};

export default Home;