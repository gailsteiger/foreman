import React from 'react';
import Component from '../common/BindingComponent';

export default class extends Component {
    constructor(props) {
        super(props);
        this.bind(
            'onClick'
        );
    }

    onClick() {
        this.props.onClick();
    }

    render() {
        // TODO: refactor to handle tooltip and placement here or in chart box
        return (
            <h4 className={this.props.cssClass}
                onClick={this.onClick}
                data-toggle="tooltip" data-placement="top" title={this.props.tooltip}>
                {this.props.header}
            </h4>
        );
    }
}
