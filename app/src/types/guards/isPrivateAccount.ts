import Account, { PrivateAccount } from "../Account"
import User from "../User"

export function isPrivateAccount(account: Account, user: User | null): account is PrivateAccount {
  if(user !== null && parseInt(account.user_id, 10) === user.userId){
    return true
  }

  return false
}