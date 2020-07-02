//object containing info about logged in user
export default interface User {
  userId: number,
  login: string,
  email: string,
  firstname: string,
  lastname?: string,
  status: number // utils/statuses
}