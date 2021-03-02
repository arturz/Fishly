//@ts-ignore
import app from 'app';

export const user = app.user as {
  userId: string,
  login: string,
  email: string,
  firstname: string,
  lastname?: string,
  status: number //utils/statuses
}
export const token = app.token as string
export const captchaSiteKey = app.captchaSiteKey as string

export default { user, token, captchaSiteKey }

sessionStorage.setItem('token', token)