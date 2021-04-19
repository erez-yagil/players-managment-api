import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import club from './clubs';


export default combineReducers({
  alert,
  auth,
  profile,
  club
});