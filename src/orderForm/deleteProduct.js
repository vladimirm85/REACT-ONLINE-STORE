import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static defaultProps = {
        deleteProduct: function(){}
    }

    static propTypes = {        
        deleteProduct: PropTypes.func
    };

    render() {
        return (
            <div>                
                <button onClick={() => {this.props.deleteProduct()}}>Delete</button>                
            </div>
        )
    };
}