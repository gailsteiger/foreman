import React from 'react';

export default class extends React.Component {
    bind(...methods) {
        methods.map(
            method => this[method] = this[method].bind(this)
        );
    }
}
