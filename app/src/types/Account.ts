import Set from "./Set"

//someone else's account
export interface PublicAccount {
  user_id: string,
  firstname: string,
  login: string,
  status: number,
  sets: Set[]
}

//account of logged in user
export interface PrivateAccount extends PublicAccount {
  lastname: string
  email: string
} 

type Account = PublicAccount | PrivateAccount
export default Account