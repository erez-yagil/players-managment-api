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
  teamLoading: true,
  error:{}
}

export default function (state=initialState, action){
  const { type, payload } = action;

  switch(type){
    case GET_TEAM:
      return {
        ...state,
        team: payload,
        teamLoading: false
      }
    case GET_TEAMS:
      return {
        ...state,
        teams: payload,
        teamLoading: false
      }
    case TEAM_ERROR:
      return {
        ...state,
        error:payload,
        teamLoading:false
      }
    case CLEAR_TEAM:
      const newTeams = state.teams.filter((team)=> team._id !== payload)
      return {
        ...state,
        team:[],
        teams:newTeams,
        teamLoading:true
      }

    default:
      return state;
  }
}
