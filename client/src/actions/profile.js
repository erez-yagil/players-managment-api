/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert'
import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  DELETE_ACCOUNT
} from './types';

// Get my Profile //

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/sayfan/profile/user/me');

    dispatch({
      type:GET_PROFILE,
      payload: res.data
    });
  
  }catch (err){
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get all Profiles //

export const getAllProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/sayfan/profile');

    dispatch({
      type:GET_PROFILES,
      payload: res.data
    });
    
  
  }catch (err){
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};

// Get Profile By Id //

export const getProfilesById = (userId) => async dispatch => {

  try {
    const res = await axios.get(`/sayfan/profile/user/${userId}`);

    dispatch({
      type:GET_PROFILE,
      payload: res.data
    });
    
  
  }catch (err){
    dispatch({
      type:PROFILE_ERROR,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
};



// Create or Update Profile //

export const createProfile = (formData, history, edit=false) => async dispatch => {
try {
  const config = {
    headers: {
      'Content-Type': 'Application/json'
    }
  }

  const res = await axios.post('/sayfan/profile', formData, config);

  dispatch({
    type:GET_PROFILE,
    payload: res.data
  });

  dispatch(setAlert(edit? 'Profile updated': 'Profile created','success'));

  history.push('/dashboard');
  

} catch (err) {
  const errors = err.response.data.errors;

   if (errors) {
   errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
  }

  dispatch({
    type:PROFILE_ERROR,
    payload:{msg:err.response.statusText, status: err.response.status}
  });
}
}

// Delete profile and user //

export const deleteUser = (userId) => async dispatch => {
  if(window.confirm('Are you sure you want to delete acount?')) {
    try {
      const res = axios.delete(`/sayfan/users/user/${userId}`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch ({ type: DELETE_ACCOUNT });

      dispatch(setAlert('User Deleted'));

    }catch(err) {
      dispatch ({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status}
      });
    }
  }
};

