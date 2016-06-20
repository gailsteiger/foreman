import React from 'react';
import Component from '../common/BindingComponent';
import ChartHeader from './ChartHeader';
import Chart from './Chart';
import ChartModal from './ChartModal';

import StatisticsStore from '../../stores/StatisticsStore';
import statisticsPage from '../../../pages/statistics_page';

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, isLoaded: false };
        this.bind(
            'drawChart',
            'onChange',
            'onClick',
            'closeModal',
            'openModal',
            'drawModal'
        );
    }

    componentDidMount() {
        StatisticsStore.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        StatisticsStore.removeChangeListener(this.onChange);
    }

    onChange() {
        const statistics = StatisticsStore.getStatisticsData(this.props.id);

        this.setState({ isLoaded: true, hasData: !!statistics.data.length, data: statistics.data });

        console.log(this.props, this.state);
    }

    onClick() {
        if (this.state.data && this.state.hasData) {
            this.openModal();
        }
    }

    drawChart() {
        statisticsPage.generateChart(this.props, this.state.data);
    }

    openModal() {
        this.setState({ showModal: true });
    }

    closeModal() {
        this.setState({ showModal: false });
    }

    drawModal() {
        statisticsPage.generateModalChart(this.props, this.state.data);
    }

    render() {
        const tooltip = 'Expand the chart';

        return (
            <div className='stats-well'>
                <ChartHeader
                    id={this.props.id}
                    onClick={this.onClick}
                    tooltip={tooltip}
                    hasData={this.state.hasData}
                    cssClass='ca pie-title'
                    header={this.props.title}/>

                <Chart isLoaded={this.state.isLoaded} {...this.props}
                       drawChart={this.drawChart}
                       cssClass='statistics-pie small c3'/>

                <ChartModal {...this.props}
                    show={this.state.showModal}
                    onHide={this.closeModal}
                    drawChart={this.drawModal}
                />
            </div>
        );
    }
}

// StatisticsChartBox.propTypes = { initialCount: React.PropTypes.number };
