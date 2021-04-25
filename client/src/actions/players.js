/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert';
import { Redirect } from 'react-router-dom';
import { 
  GET_PLAYER, 
  GET_PLAYERS, 
  CLEAR_PLAYER,
  PLAYER_ERROR
} from './types';


// Get Player by id //

export const getCurrentPlayer = (playerId) => async dispatch => {
 
  try {
    const res = await axios.get(`/sayfan/users/${playerId}`);
    dispatch({
      type:GET_PLAYER,
      payload: res.data
    });

    alert('uploaded')
    
  }catch (err){
    dispatch({
      type:PLAYER_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get All Players //

export const getAllPlayers = () => async dispatch => {
 
  try {
    const res = await axios.get('/sayfan/users');
    
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

// Create Player //

export const createUser = (formData, history, edit=false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }

    let res = await axios.post('/sayfan/users', formData, config);

        
    console.log(edit)
    dispatch({
      type:GET_PLAYER,
      payload: res.data
    });
  
    dispatch(setAlert(edit ? 'Player updated': 'Player created','success'));
  
    // history.push('/players');
    <Redirect to="/add-club"></Redirect>

  
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
  
      const res = await axios.patch(`/sayfan/users/${playerId}`, formData, config);
  
          
      dispatch({
        type:GET_PLAYER,
        payload: res.data
      });
    
      dispatch(setAlert(edit ? 'Player updated': 'Player created','success'));
    
      history.push('/players');
      
    
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
        const res = axios.delete(`/sayfan/users/${playerId}`);

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

      }catch(err) {
        dispatch ({
          type: PLAYER_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
        });
      }
  };


