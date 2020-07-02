import User from "./User";

export default interface State {
  user: User | null
  token: string
  captchaSiteKey: string
}