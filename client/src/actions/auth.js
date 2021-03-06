/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert'
import {
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT
  } from './types';

  import setAuthToken from '../utils/setAuthToken';
  
  export const loadUser = () => async dispatch => {
    if(localStorage.token){
      setAuthToken(localStorage.token)
    }
    
    try {
      const res = await axios.get('/sayfan/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  }

  // Login user //

  export const login = ( email, password ) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ email, password });
    try{
      const res = await axios.post('sayfan/auth', body, config)
      
      dispatch({
        type:LOGIN_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());

    } catch(err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
        type:LOGIN_FAIL
      })
    }
  }

  // Logout user //


  export const logout = () =>  dispatch => {
    dispatch({ type:LOG_OUT });
  };