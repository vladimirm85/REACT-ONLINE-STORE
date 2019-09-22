import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';

export default () => {
    return (
        <>
            <h1>Error 404, page not found</h1>
            <hr/>
            <div className="alert alert-warning">
                <p>                     
                    <Link to={RoutesMap.home}>Go to Home page</Link>
                </p>
            </div>
        </>

    );
}