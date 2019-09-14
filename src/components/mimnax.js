import React from 'react';
import PropTypes from 'prop-types';
import Lazy from '~c/lazyInput.js'
import styles from './minmax.module.css'

export default class extends React.Component {
    static defaultProps = {
        onChange: function(){}
    }

    static propTypes = {
        min: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        onChange: PropTypes.func
    };

    lazyInput = React.createRef();

    increase = () => {
        this.set(this.props.quantity + 1);
    };

    decrease = () => {
        this.set(this.props.quantity - 1); 
    };

    set (newInputValue) {
        let validValue = Math.min(Math.max(newInputValue, this.props.min), this.props.max);        
        this.props.onChange(validValue);        
        this.lazyInput.current.setValue(validValue);
    };

    setValue = (event) => {
        let correctValue = parseInt (event.target.value);
        if (isNaN (correctValue)) {
            correctValue = this.props.min;
        }
        this.set(correctValue);
    };

    render() {
        return (
            <div>                
                <button onClick={this.decrease}>-</button>
                <Lazy
                    nativeProps={{type: 'text', className: styles.input}}
                    value={this.props.quantity}
                    onChange={(e) => {this.setValue(e)}}
                    ref={this.lazyInput}
                />
                <button onClick={this.increase}>+</button>
            </div>
        )
    };
}