import AppDispatcher from '../dispatcher';
import ActionTypes from '../constants';
import AppEventEmitter from './AppEventEmitter';

const _statistics = {};

class StatisticsEventEmitter extends AppEventEmitter {
    getStatisticsData(id) {
        _statistics[id] = _statistics[id] || { data: []};
        
        return _statistics[id];
    }
}

const StatisticsStore = new StatisticsEventEmitter();

AppDispatcher.register(action => {
    switch (action.actionType) {
        case ActionTypes.RECEIVED_STATISTICS:
            const item = action.rawStatistics;

            _statistics[item.id] = _statistics[item.id] || {};
            _statistics[item.id].data = item.data || [];
            StatisticsStore.emitChange();
            break;

        default:
            // no op
            break;
    }
});

export default StatisticsStore;
