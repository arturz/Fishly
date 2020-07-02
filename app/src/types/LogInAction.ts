import User from "./User";

export const LOG_IN = 'LOG_IN'
export default interface LogInAction {
  type: typeof LOG_IN
  payload: {
    user: User
  }
}