/* eslint-disable no-undef */
/* eslint-disable import/no-anonymous-default-export */
import { 
  GET_PLAYER, 
  GET_PLAYERS, 
  CLEAR_PLAYER,
  PLAYER_ERROR
    
} from "../actions/types";

const initialState = {
  player: null,
  players:[],
  loading: true,
  error:{}
}

export default function (state=initialState, action){
  const { type, payload } = action;

  switch(type){
    case GET_PLAYER:
      return {
        ...state,
        player: payload,
        loading: false
      }
    case GET_PLAYERS:
      return {
        ...state,
        players: payload,
        loading: false
      }
    case CLEAR_PLAYER:
      return {
        ...state,
        error:payload,
        loading:false
      }
    case PLAYER_ERROR:
      const newPlayers = state.players.filter((player)=> player._id !== payload)
      return {
        ...state,
        player:[],
        players:newPlayers,
        loading:true
      }

    default:
      return state;
  }
}
