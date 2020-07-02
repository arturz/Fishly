import Action from "../types/Action";
import { LOG_IN } from "../types/LogInAction";
import { LOG_OUT } from "../types/LogOutAction";
import User from "../types/User";

export function logIn(user: User): Action {
  return {
    type: LOG_IN,
    payload: {
      user,
    },
  };
}

export function logOut(): Action {
  return {
    type: LOG_OUT,
  };
}
