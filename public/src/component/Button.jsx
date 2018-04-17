import * as React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes } from 'prop-types';
import { LocaleValue } from './LocaleProvider.jsx';

import './css/common.css';
import './css/button.css';

export class Button extends React.Component {
    static propTypes = {
        onClick: PropTypes.func,
        value: PropTypes.string.isRequired,
        size: PropTypes.string
    };

    static contextTypes = {
        locale: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.state = {
            className: "dd-button"
        }
        switch (this.props.size) {
            case "lg":
                this._sizeClassName = " dd-button-lg";
                break;
            case "sm":
                this._sizeClassName = " dd-button-sm";
                break;
            default:
                this._sizeClassName = "";
                break;
        }
    }

    _MouseDown(e) {
        this.setState({
            className: "dd-button dd-button-clicked"
        });
        setTimeout(() => {
            this.setState({
                className: "dd-button"
            });
        }, 400);
    }

    _Click(e) {
        if (this.props.onClick) {
            this.props.onClick(this.props, e)
        }
    }

    render() {
        return (
            <button className={this.state.className + this._sizeClassName} type="button" onMouseDown={(e) => this._MouseDown(e)} onClick={(e) => this._Click(e)}><span>{LocaleValue(this.context.locale, this.props.value)}</span></button>
        );
    }
}