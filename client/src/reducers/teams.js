/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import { 
  GET_TEAM, 
  GET_TEAMS, 
  CLEAR_TEAM,
  TEAM_ERROR
    
} from "../actions/types";

const initialState = {
  team: null,
  teams:[],
  loading: true,
  error:{}
}

export default function (state=initialState, action){
  const { type, payload } = action;

  switch(type){
    case GET_TEAM:
      return {
        ...state,
        team: payload,
        loading: false
      }
    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
        loading: false
      }
    case TEAM_ERROR:
      return {
        ...state,
        error:payload,
        loading:false
      }
    case CLEAR_TEAM:
      const newTeams = state.teams.filter((team)=> team._id !== payload)
      return {
        ...state,
        team:[],
        teams:newTeams,
        loading:true
      }

    default:
      return state;
  }
}
