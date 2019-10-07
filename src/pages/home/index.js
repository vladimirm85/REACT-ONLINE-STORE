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
        this.props.store.home.getProducts();
    };

    render () {

        const { home: HomeStore, cart: CartStore, serverResponse: ServerResponseStore } = this.props.store;

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
                {(ServerResponseStore.getServerResponseStatus === 'pending')
                ?<LoaderComponent/>
                :(ServerResponseStore.getServerResponseError)
                ?<ServerErrorComponent/>
                :<CardColumns>
                    {productsCards}
                </CardColumns>}
            </div>
        )
    }
}

export default withStore(Home);