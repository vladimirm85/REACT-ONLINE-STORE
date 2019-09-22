import React from 'react';
import { Button, Card, CardColumns } from 'react-bootstrap';
import {observer} from 'mobx-react';
import { Link } from 'react-router-dom';
import { UrlBuild } from '~/routes';
import HomeStore from '~s/homeStore.js';


@observer class Home extends React.Component {

    render () {

        const productsCards = HomeStore.products.map((product) => {
        
            return (
                <Card key={product.id} className="text-center">
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                        Price: {product.price}
                        </Card.Text>
                        <Button
                            variant={HomeStore.isInCart(product.id) ? "warning" : "primary"}
                            onClick={()=>{
                                HomeStore.isInCart(product.id)
                                ? HomeStore.removeFromCart(product.id)
                                : HomeStore.addToCart(product.id);
                            }}
                        >
                            {HomeStore.isInCart(product.id) ? "Delete from cart" : "Add to cart"}
                        </Button>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={UrlBuild('product', {id: product.id})}>
                            More info
                        </Link>
                    </Card.Footer>
                </Card>
            );
        });

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