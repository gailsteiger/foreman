import React from 'react';
import Component from '../common/BindingComponent';

import CenteredLoader from '../common/CenteredLoader';
export default class extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let chart;

        if (this.props.isLoaded) {
            this.props.drawChart();
            chart = (<div className={this.props.cssClass} id={this.props.id + 'Chart'}></div>);
        } else {
            chart = <CenteredLoader className={this.props.cssClass} type='spin' />;
        }

        return (<div type='spin'> {chart} </div>);
    }
}
