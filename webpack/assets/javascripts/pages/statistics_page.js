import donut from '../services/c3DonutChartService';

export default {
    generateChart: generateChart,
    generateModalChart: generateModalChart
};

function generateChart(details, data) {
    let dataEventHandlers = {
        onclick: getClickHandler(details.searchApi)
    };

    let config = donut.getDonutConfig(data, '#' + details.id + 'Chart', dataEventHandlers);

    donut.generate(config);

    function getClickHandler(url) {
        if (url) {
            // eslint-disable-next-line no-unused-vars
            return function (d, i) {
                let val = d.id;

                if (url.includes('~VAL1~') || url.includes('~VAL2~')) {
                    let vals = val.split(' ');
                    let val1 = encodeURIComponent(vals[0]);
                    let val2 = encodeURIComponent(vals[1]);

                    url = url.replace('~VAL1~', val1);
                    url = url.replace('~VAL2~', val2);
                } else {
                    if (val.includes(' ')) {
                        val = '"' + val + '"';
                    }
                    url = url.replace('~VAL~', val);
                }
                window.location.href = url;
            };
        }
        return null;
    }
}

function generateModalChart(details, data) {
    const config = donut.getLargeDonutConfig(data, '#' + details.id + 'ModalChart');

    donut.generate(config);
}

