import Action from "../types/Action"
import State from "../types/State"

export default function reducer(state: State, action: Action): State {
  switch(action.type){
    case 'LOG_OUT':
      return {
        ...state,
        user: null
      }

    case 'LOG_IN':
      return { 
        ...state,
        user: action.payload.user
      }

    default:
      return state
  }
}