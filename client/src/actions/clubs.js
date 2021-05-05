/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert'
import { 
  GET_CLUB, 
  GET_CLUBS, 
  CLEAR_CLUB,
  CLUB_ERROR
} from './types';


// Get Club by id //

export const getCurrentClub = (clubId) => async dispatch => {
  try {
    const res = await axios.get(`/sayfan/club/${clubId}`);

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

export const getAllClubs = (teamNum) => async dispatch => {
 
  try {

    const team = await axios.get(`/sayfan/team/me/${teamNum}`);
    const res = await axios.get(`/sayfan/club//me/${team.data.clubNum}`);
    

    dispatch({
      type:GET_CLUBS,
      payload: [res.data]
    });
  
  }catch (err){
    dispatch({
      type:CLUB_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Create Club //

export const createClub = (formData, history, edit=false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }

    let res = await axios.post('/sayfan/club', formData, config);

        
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


  // Update Club //

  export const updateClub = (formData, history, edit=true, clubId) => async dispatch => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json'
        }
      }
  
      const res = await axios.patch(`/sayfan/club/${clubId}`, formData, config);
  
          
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
  

  export const clearClub = () => async dispatch => {
 
    try {
    
      dispatch({
        type:CLEAR_CLUB
      });
        
    }catch (err){
      dispatch({
        type:CLUB_ERROR,
        payload:{msg:err.response.statusText, status: err.response.status}
      });
    }
  };

