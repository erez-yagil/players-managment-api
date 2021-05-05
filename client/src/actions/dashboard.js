import { setAlert } from './alert'
import axios from 'axios';
import { 
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL 
       } from './types';


       
export const helpMessage = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'Application/json'
      }
    }

    let res = await axios.post('/sayfan/contactus', formData, config);

        
    dispatch({
      type:SEND_MESSAGE_SUCCESS,
      payload: res.data
    });
  
    dispatch(setAlert('Message Sent!','success'));
  
  
  } catch (err) {
    const errors = err.response.data.errors;
  
     if (errors) {
     errors.forEach(error => dispatch(setAlert(error.msg,'danger')));
    }
  
    dispatch({
      type:SEND_MESSAGE_FAIL,
      payload:{msg:err.response.statusText, status: err.response.status}
    });
  }
  };


