/* eslint-disable no-unused-vars */
import axios from 'axios';
import { setAlert } from './alert'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOG_OUT,
  CLEAR_PROFILE
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

// Register new user //

  export const register = ({ firstName, lastName, email, password, accessLevel }) => async dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const body = JSON.stringify({ firstName, lastName, email, password, accessLevel });
    try{
      const res = await axios.post('sayfan/users', body, config)

      dispatch({
        type:REGISTER_SUCCESS,
        payload: res.data
      });

      dispatch(loadUser());

    } catch(err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
      }
      dispatch({
        type:REGISTER_FAIL
      })
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
    dispatch({ type:CLEAR_PROFILE });
    dispatch({ type:LOG_OUT });
  };