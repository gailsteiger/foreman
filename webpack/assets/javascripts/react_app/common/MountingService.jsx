/* eslint-disable no-unused-vars */
import React from 'react';
import StatisticsChartsList from '../components/charts/StatisticsChartsList';
/* eslint-enable no-unused-vars */
import ReactDOM from 'react-dom';

export function mount(component, selector, data) {

    const components = {
        StatisticsChartsList: {
            type: StatisticsChartsList,
            markup: <StatisticsChartsList data={data}/>
        }
    };

    const reactNode = document.querySelector(selector);

    if (reactNode) {
        ReactDOM.render(components[component].markup, reactNode);
    }
}
