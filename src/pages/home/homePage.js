import React from 'react';
import withStore from '~/hocs/withStore.js'
import LoaderComponent from '~c/loaderComponent.js';
import ServerErrorComponent from '~c/serverErrorComponent.js';
import { Button, Card, CardColumns } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UrlBuild } from '~/routes';
const {Body, Title, Text, Footer} = Card;

class Home extends React.Component {

    componentDidMount() {
        this.props.store.homeStore.getProducts();
    };

    render () {

        const { homeStore, cartStore } = this.props.store;

        const productsCards = homeStore.products.map((product) =>
            <Card key={product.id} className="text-center">
                <Body>
                    <Title>{product.title}</Title>
                    <Text>
                    Price: {product.price}
                    </Text>
                    <Button
                        variant={cartStore.isCartProduct(product.id) ? "warning" : "primary"}
                        onClick={()=>{
                            cartStore.isCartProduct(product.id)
                            ? cartStore.removeCartProduct(product.id)
                            : cartStore.addCartProduct(product);
                        }}
                    >
                        {cartStore.isCartProduct(product.id) ? "Delete from cart" : "Add to cart"}
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
                {(homeStore.getServerResponseStatus === 'pending' ||
                  cartStore.getServerResponseStatus === 'pending')
                ?<LoaderComponent/>
                :(homeStore.getServerResponseStatus === 'rejected')
                ?<ServerErrorComponent/>
                :<CardColumns>
                    {productsCards}
                </CardColumns>}
            </div>
        )
    }
}

export default withStore(Home);