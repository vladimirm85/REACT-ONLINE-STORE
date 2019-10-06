import React from 'react';
import withStore from '~/hocs/withStore.js'
import { Button, Card, CardColumns, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UrlBuild } from '~/routes';
const {Body, Title, Text, Footer} = Card;

class Home extends React.Component {

    componentDidMount() {
        this.props.store.home.getProducts();
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
                {(HomeStore.getServerResponseStatus === 'pending')
                ?<Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
                :(HomeStore.serverResponseError)
                ?<div>serverResponseError</div>
                :<CardColumns>
                    {productsCards}
                </CardColumns>}
            </div>
        )
    }
}

export default withStore(Home);