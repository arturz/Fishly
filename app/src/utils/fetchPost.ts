import { stringify } from 'qs'

export default async (path: string, data?: object) => {
  const body = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }, 
    ...data && { body: stringify(data) }
  })
  const result = await body.json()
  return result
}