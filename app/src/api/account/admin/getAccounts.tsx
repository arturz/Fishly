import fetch from '../../../utils/fetch'

export default () =>
  fetch(`api/account/admin/get_accounts.php`)