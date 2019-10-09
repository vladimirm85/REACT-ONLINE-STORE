import React from 'react';
import { Link } from 'react-router-dom';
import { RoutesMap } from '~/routes';

const E404 = ({}) => 
    <>
        <h1>Error 404, page not found</h1>
        <hr/>
        <div className="alert alert-warning">
            <p>                     
                <Link to={RoutesMap.home}>Go to Home page</Link>
            </p>
        </div>
    </>
;

export default E404;