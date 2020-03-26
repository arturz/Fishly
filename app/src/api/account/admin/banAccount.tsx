import fetch from '../../../utils/fetch'

export default (userId: number) =>
  fetch(`api/account/admin/ban_account.php`, { userId })