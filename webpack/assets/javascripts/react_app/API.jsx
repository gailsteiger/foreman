import ServerActions from './actions/ServerActions';

export default {
    getStatisticsData(url) {
        $.getJSON(url)
            .success(
                rawStatistics => ServerActions.receivedStatistics(rawStatistics)
            )
            .error(error => console.log(error));
    }
};
