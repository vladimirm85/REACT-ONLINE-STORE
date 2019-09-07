import React from 'react';
import PropTypes from 'prop-types';

export default class extends React.Component {
    static defaultProps = {
        onChange: function(e){},
        nativeProps: {}
    }

    static propTypes = {
        value: PropTypes.any.isRequired,
        onChange: PropTypes.func,
        nativeProps: PropTypes.object
    };

    nativeInput = React.createRef();

    componentDidUpdate (prevProps, prevState) {
        let input = this.nativeInput.current;
        if (prevProps.value !== this.props.value ||
            input.value != this.props.value) {
            
            input.value = this.props.value;
        };
    };

    checkChange = (e) => {
       if(this.props.value.toString !== e.target.value) {
           this.props.onChange(e);
       };
    };

    checkEnterKey = (e) => {        
        if (e.keyCode === 13) {
            this.checkChange(e);
        }
    };

    onClick = (e) => {
        let v = e.target.value;
        if (v == 'Enter your name' ||
            v == 'Enter your e-mail' ||
            v == 'Enter delivery address')
            e.target.value = '';
    };

    render() {
        return (
            <input {...this.props.nativeProps}
                   defaultValue={this.props.value}
                   onBlur={this.checkChange}
                   onKeyUp={this.checkEnterKey}
                   onClick={this.onClick}
                   ref={this.nativeInput}
            />            
        )
    };
}