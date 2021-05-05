/* eslint-disable import/no-anonymous-default-export */
import { 
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from '../actions/types';

const initialState = {
  message:null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SEND_MESSAGE_SUCCESS :
      return {
        message:payload
      };
    case SEND_MESSAGE_FAIL :
      return state;
    default:
      return state;
  }
}