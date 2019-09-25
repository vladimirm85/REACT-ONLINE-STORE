import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import {observer} from 'mobx-react';
import { Link } from 'react-router-dom';
import { UrlBuild } from '~/routes';
import HomeStore from '~s/homeStore.js';
import CartStore from '~s/cartStore.js';
const {Body, Title, Text, Footer} = Card;

@observer class Home extends React.Component {

    componentDidMount() {
        HomeStore.getData();
        CartStore.getCartsProducts();
    };

    render () {

        const productsCards = HomeStore.products.map((product) =>
            <Card key={product.id} className="text-center">
                <Body>
                    <Title>{product.title}</Title>
                    <Text>
                    Price: {product.price}
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
                <Footer>
                    <Link to={UrlBuild('product', {id: product.id})}>
                        More info
                    </Link>
                </Footer>
            </Card>
        );

        return (
            <div>
                <CardColumns>
                    {productsCards}
                </CardColumns>
            </div>
        )
    }
}

export default Home;