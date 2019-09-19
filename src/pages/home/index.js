import React from 'react'
import ProductsStore from '~s/productsStore.js'
import { Button, Card, CardColumns } from 'react-bootstrap'
import {observer} from 'mobx-react'
import { Link } from 'react-router-dom';

import { UrlBuild } from '~/routes'

@observer class Home extends React.Component {

    render () {         

        const productsCards = ProductsStore.products.map((product) => {
        
            return (
                <Card key={product.id} className="text-center">
                    <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>
                        Price: {product.price}
                        </Card.Text>
                        <Button
                            variant={product.inCart ? "warning" : "primary"}
                            onClick={()=>{
                                product.inCart
                                ? ProductsStore.removeFromCard(product)
                                : ProductsStore.addToCard(product);
                            }}
                        >
                            {product.inCart ? "Delete from cart" : "Add to cart"}
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