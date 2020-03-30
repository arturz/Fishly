import { stringify } from 'qs'

const isLocalhost = ["localhost", "127.0.0.1", '[::1]'].includes(location.hostname)

export default async (path: string, data?: object) => {
  const body = await fetch(isLocalhost ? path : `/${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body: stringify({
      ...data,
      token: sessionStorage.getItem('token')
    })
  })
  return await body.json()
}