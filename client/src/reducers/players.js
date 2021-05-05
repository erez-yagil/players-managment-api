/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import { 
  GET_PLAYER, 
  GET_PLAYERS,
  GET_PLAYERS_BY_TEAM,
  CLEAR_PLAYER,
  PLAYER_ERROR
    
} from "../actions/types";

const initialState = {
  player: null,
  players:[],
  playersByTeam:[],
  playerLoading: true,
  error:{}
}

export default function (state=initialState, action){
  const { type, payload } = action;

  switch(type){
    case GET_PLAYER:
      return {
        ...state,
        player: payload,
        playerLoading: false
      }
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        playerLoading: false
      }
      case GET_PLAYERS_BY_TEAM:
      return {
        ...state,
        playersByTeam: payload,
        playerLoading: false
      }
    case PLAYER_ERROR:
      return {
        ...state,
        error:payload,
        playerLoading:true
      }
    case CLEAR_PLAYER:
      const newPlayers = state.players.filter((player)=> player._id !== payload)
      return {
        ...state,
        player:[],
        players:newPlayers,
        playerLoading:false
      }

    default:
      return state;
  }
}
