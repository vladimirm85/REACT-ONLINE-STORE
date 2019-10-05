import React from 'react';
import withStore from '~/hocs/withStore.js'
import { Button, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UrlBuild } from '~/routes';
const {Body, Title, Text, Footer} = Card;

class Home extends React.Component {

    componentDidMount() {
        this.props.store.home.getData();
    };

    render () {

        const HomeStore = this.props.store.home;
        const CartStore = this.props.store.cart;

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
                        disabled={CartStore.elementInProcess(product.id)}
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

export default withStore(Home);