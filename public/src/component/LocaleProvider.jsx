import * as React from 'react';
import { PropTypes } from 'prop-types';
import en_US from './locales/en_US'

export function LocaleValue(locale, key) {
    const paths = key.split('.');
    let value = locale;
    for (let path of paths) {
        value = value[path];
    }
    if (!value) {
        return key;
    }
    return value;
}

export class LocaleLabel extends React.Component {
    static contextTypes = {
        locale: PropTypes.object.isRequired
    };

    constructor(props, context) {
        super(props, context);
        this.locale = this.context.locale;
        this.value = LocaleValue(this.locale, this.props.value);
    }

    render() {
        if (this.context.locale !== this.locale) {
            this.locale = this.context.locale;
            this.value = LocaleValue(this.locale, this.props.value);
            return this.value;
        }
        return this.value;
    }
}

export class LocaleProvider extends React.Component {
    static propTypes = {
        locale: PropTypes.object
    };

    static defaultProps = {
        locale: en_US
    };

    static childContextTypes = {
        locale: PropTypes.object
    };

    constructor(props, context) {
        super(props, context);
    }

    getChildContext() {
        let current_locale = null;
        if (this.props.locale != null) {
            current_locale = this.props.locale;
        }
        return {
            locale: current_locale
        };
    }

    render() {
        return this.props.children;
    }
}