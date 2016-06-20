import { EventEmitter } from 'events';
const CHANCE_EVENT = 'CHANGE';

export default class AppEventEmitter extends EventEmitter {
    emitChange() {
        this.emit(CHANCE_EVENT);
    }

    addChangeListener(callback) {
        this.on(CHANCE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANCE_EVENT, callback);
    }
}
