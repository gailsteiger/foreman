import React from 'react';
import Component from '../common/BindingComponent';
import StatisticsChartActions from '../../actions/StatiscticChartActions';
import StatisticsChartBox from './StatisticsChartBox';

export default class StatisticsChartsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const styles = {
            display: 'flex',
            flexWrap: 'wrap'
        };
        let charts = [];
        
        this.props.data.forEach(chart => {
            charts.push(<StatisticsChartBox key={chart.id} {...chart} />);
            StatisticsChartActions.getStatisticsData(chart.dataApi);
        });
        
        return (
            <div className='collection' style={styles}>
                {charts}
            </div>
        );
    }
}
