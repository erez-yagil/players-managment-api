/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert'
import { 
  GET_CLUB, 
  GET_CLUBS, 
  CLEAR_CLUB,
  CLUB_ERROR
  
} from './types';

// Get My Club //

export const getCurrentClub = () => async dispatch => {
 
  try {
    const res = await axios.get('/sayfan/club/me');
    dispatch({
      type:GET_CLUB,
      payload: res.data
    });
  
  }catch (err){
    dispatch({
      type:CLUB_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get All Clubs //

export const getAllClubs = () => async dispatch => {
 
  try {
    const res = await axios.get('/sayfan/club');
    
    dispatch({
      type:GET_CLUBS,
      payload: res.data
    });
  
  }catch (err){
    dispatch({
      type:CLUB_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Create or Update Profile //

export const createClub = (formData, history, edit=false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }
  
    const res = await axios.post('/sayfan/club', formData, config);
  
    dispatch({
      type:GET_CLUB,
      payload: res.data
    });
  
    dispatch(setAlert(edit ? 'Club updated': 'Club created','success'));
  
    history.push('/clubs');
    
  
  } catch (err) {
    const errors = err.response.data.errors;
  
     if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
  
    dispatch({
      type:CLUB_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
  };

  // Delete Club  //

  export const deleteClub = (clubId) => async dispatch => {
    if(window.confirm('Are you sure you want to delete Club?')) {
      try {
        const res = axios.delete(`/sayfan/club/${clubId}`);

        dispatch({
          type: CLEAR_CLUB,
          payload: clubId
        })

        dispatch(setAlert('Club Deleted'));

      }catch(err) {
        dispatch ({
          type: CLUB_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
        });
      }
    }
  };