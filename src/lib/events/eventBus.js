import EventEmitter from 'events';
import * as action from './eventActions';
import * as event from './eventTypes';

class EventBus extends EventEmitter {}
const eventBus = new EventBus();

// map events to their respective actions
eventBus.on(event.SIGNUP, action.sendVerificationMail);

export default eventBus;
