import { stringify } from 'qs'

export default async (path: string, data?: object) => {
  console.log(data, stringify({...data}))

  const body = await fetch(path, {
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