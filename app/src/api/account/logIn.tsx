import User from '../../types/User'
import fetch from '../../utils/fetch'

type Result = { error: string } | { user: User, token: string }

export default (state: { login: string, password: string }): Promise<Result> =>
  fetch('api/account/login.php', state)