import {combineReducers} from 'redux';
import alert from './alert';
import auth from './auth';
import club from './clubs';
import team from './teams';
import player from './players';




export default combineReducers({
  alert,
  auth,
  club,
  team,
  player
});