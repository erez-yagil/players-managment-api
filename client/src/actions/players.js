/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { setAlert } from './alert';
import { 
  GET_PLAYER, 
  GET_PLAYERS,
  GET_PLAYERS_BY_TEAM, 
  CLEAR_PLAYER,
  PLAYER_ERROR
} from './types';


// Get Player by id //

export const getCurrentPlayer = (playerId) => async dispatch => {
 console.log(playerId)
  try {
    const res = await axios.get(`/sayfan/users/player/${playerId}`);
    dispatch({
      type:GET_PLAYER,
      payload: res.data
    });
    
  }catch (err){
    dispatch({
      type:PLAYER_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get All Players //

export const getAllPlayers = (teamNum) => async dispatch => {
 
  try {

    const team = await axios.get(`/sayfan/team/me/${teamNum}`);
    const res = await axios.get(`/sayfan/users/player/club/${team.data.clubNum}`);

    dispatch({
      type:GET_PLAYERS,
      payload: res.data
    });

  }catch (err){
    dispatch({
      type:PLAYER_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get All Players by team //

export const getAllPlayersByTeam = (teamNum) => async dispatch => {
 
  try {
    const res = await axios.get(`/sayfan/users/player/team/${teamNum}`);
    
    dispatch({
      type:GET_PLAYERS_BY_TEAM,
      payload: res.data
    });

      
  }catch (err){
    dispatch({
      type:PLAYER_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Create Player //

export const createUser = (formData,history, edit=false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }

    let res = await axios.post('/sayfan/users/player', formData, config);

        
    dispatch({
      type:GET_PLAYER,
      payload: res.data
    });
  
    dispatch(setAlert(edit ? 'Player updated': 'Player created','success'));
    
    console.log(history);
  
  } catch (err) {
    const errors = err.response.data.errors;
  
     if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
  
    dispatch({
      type:PLAYER_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
  };


  // Update Player //

  export const updatePlayer = (formData, history, edit=true, playerId) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json'
        }
      }
  
      const res = await axios.patch(`/sayfan/users/player/${playerId}`, formData, config);
  
          
      dispatch({
        type:GET_PLAYER,
        payload: res.data
      });
    
      dispatch(setAlert(edit ? 'Player updated': 'Player created','success'));
    
      history.goBack();

    
    } catch (err) {
      const errors = err.response.data.errors;
    
       if (errors) {
       errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
    
      dispatch({
        type:PLAYER_ERROR,
        payload:{msg:err.response.statusText, status: err.response.status}
      });
    }
    };



  // Delete Player  //

  export const deletePlayer = (playerId) => async dispatch => {
    if(window.confirm('Are you sure you want to delete Player?')) {
      try {
        const res = axios.delete(`/sayfan/users/player/${playerId}`);

        dispatch({
          type: CLEAR_PLAYER,
          payload: playerId
        })

        dispatch(setAlert('Player Deleted'));
        

      }catch(err) {
        dispatch ({
          type: PLAYER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
        });
      }
    }
  };


  export const clearPlayer = () => async dispatch => {
      try {

        dispatch({
          type: CLEAR_PLAYER
        });

      } catch(err) {
        dispatch ({
          type: PLAYER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
        });
      }
  };



