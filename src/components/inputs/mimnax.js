import React from 'react';
import PropTypes from 'prop-types';
import Lazy from '~c/inputs/lazyInput.js';

export default class extends React.PureComponent {
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
        const validValue = Math.min(Math.max(newInputValue, this.props.min), this.props.max);        
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
                <button
                    onClick={this.decrease}
                    disabled={this.props.quantity <= this.props.min}
                >
                    -
                </button>
                <Lazy
                    nativeProps={{type: 'text'}}
                    value={this.props.quantity}
                    onChange={(e) => {this.setValue(e)}}
                    ref={this.lazyInput}
                />
                <button
                    onClick={this.increase}
                    disabled={this.props.quantity >= this.props.max}
                >
                    +
                </button>
            </div>
        )
    };
}