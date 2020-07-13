import authentication from './authentication';
import uploaditem from './uploaditem';
import labelitem from './labelitem';
import { combineReducers } from 'redux';

export default combineReducers({
    authentication,
    uploaditem,
    labelitem
});