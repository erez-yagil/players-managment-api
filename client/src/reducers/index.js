import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import club from './clubs';
import team from './teams';



export default combineReducers({
  alert,
  auth,
  profile,
  club,
  team
});