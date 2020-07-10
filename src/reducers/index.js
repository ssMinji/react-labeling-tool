import authentication from './authentication';
import uploaditem from './uploaditem';
import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    uploaditem
});