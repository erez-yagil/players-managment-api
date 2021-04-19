/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import { 
  GET_CLUB, 
  GET_CLUBS, 
  CLEAR_CLUB,
  CLUB_ERROR
    
} from "../actions/types";

const initialState = {
  club: null,
  clubs:[],
  loading: true,
  error:{}
}

export default function (state=initialState, action){
  const { type, payload } = action;

  switch(type){
    case GET_CLUB:
      return {
        ...state,
        club: payload,
        loading: false
      }
    case GET_CLUBS:
      return {
        ...state,
        clubs: payload,
        loading: false
      }
    case CLUB_ERROR:
      return {
        ...state,
        error:payload,
        loading:false
      }
    case CLEAR_CLUB:
      const newClubs = state.clubs.filter((club)=> club._id!==payload)
      return {
        ...state,
        clubs:newClubs,
        loading:false
      }

    default:
      return state;
  }
}
