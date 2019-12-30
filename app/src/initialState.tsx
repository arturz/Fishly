//@ts-ignore
import app from 'app'

const { user, token } = app
export default { user, token }

sessionStorage.setItem('token', token)