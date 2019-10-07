import React from 'react';
import { Spinner } from 'react-bootstrap';

const loaderComponent = ({}) => {

    return (
        <div>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>            
        </div>
    );
};

export default loaderComponent;