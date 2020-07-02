import Account from '../../types/Account'
import fetch from '../../utils/fetch'

export default (userId: number): Promise<Account> =>
  fetch(`api/account/get_account.php?userId=${userId}`)