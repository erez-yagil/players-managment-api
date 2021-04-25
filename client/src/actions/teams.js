/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert'
import { 
  GET_TEAM, 
  GET_TEAMS, 
  CLEAR_TEAM,
  TEAM_ERROR
  
} from './types';

// Get My Team //

export const getMyTeam = () => async dispatch => {
 
  try {
    const res = await axios.get('/sayfan/team/me');
    dispatch({
      type:GET_TEAM,
      payload: res.data
    });
  
  }catch (err){
    dispatch({
      type:TEAM_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};


// Get Team By Id //

export const getCurrentTeam = (teamId) => async dispatch => {
 console.log(teamId);
  try {
    const res = await axios.get(`/sayfan/team/${teamId}`);
    dispatch({
      type:GET_TEAM,
      payload: res.data
    });
  
  }catch (err){
    dispatch({
      type:TEAM_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get All Teams //

export const getAllTeams = () => async dispatch => {
 
  try {
    const res = await axios.get('/sayfan/team');
    
    dispatch({
      type:GET_TEAMS,
      payload: res.data
    });
  
  }catch (err){
    dispatch({
      type:TEAM_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Create Team //

export const createTeam = (formData, history, edit=false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }
  
    const res = await axios.post('/sayfan/team', formData, config);
  
    dispatch({
      type:GET_TEAM,
      payload: res.data
    });
  
    dispatch(setAlert(edit ? 'Team updated': 'Team created','success'));
  
    history.push('/Teams');
    
  
  } catch (err) {
    const errors = err.response.data.errors;
  
     if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
  
    dispatch({
      type:TEAM_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
  };


// Update Team //

export const updateTeam = (formData, history, edit=true, teamId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }

    const res = await axios.patch(`/sayfan/team/${teamId}`, formData, config);

        
    dispatch({
      type:GET_TEAM,
      payload: res.data
    });
  
    dispatch(setAlert(edit ? 'Team updated': 'Team created','success'));
  
    history.push('/teams');
    
  
  } catch (err) {
    const errors = err.response.data.errors;
  
     if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
  
    dispatch({
      type:TEAM_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
  };


  // Delete Team  //

  export const deleteTeam = (TeamId) => async dispatch => {
    if(window.confirm('Are you sure you want to delete Team?')) {
      try {
        const res = axios.delete(`/sayfan/team/${TeamId}`);

        dispatch({
          type: CLEAR_TEAM,
          payload: TeamId
        })

        dispatch(setAlert('Team Deleted'));

      }catch(err) {
        dispatch ({
          type: TEAM_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
        });
      }
    }
  };

  // Clear Team  //

  export const clearTeam = () => async dispatch => {
      try {

        dispatch({
          type: CLEAR_TEAM
        })

      }catch(err) {
        dispatch ({
          type: TEAM_ERROR,
          payload: { msg: err.response.statusText, status: err.response.status}
        });
      }
    };
  