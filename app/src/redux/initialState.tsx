//@ts-ignore
import app from 'app';
import State from '../types/State';
import User from '../types/User';

app.user.userId = parseInt(app.user.userId, 10)
app.user.status = parseInt(app.user.status, 10)

export const user = app.user as User
export const token = app.token as string
export const captchaSiteKey = app.captchaSiteKey as string

const initialState: State = { user, token, captchaSiteKey }
export default initialState

sessionStorage.setItem('token', token)