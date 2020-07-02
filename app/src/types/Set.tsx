import Word from "./Word";

export default interface Set {
  words: Word[]
  saved: boolean
  reported: boolean
  name: string
  subject?: string
  login: string
  user_id: number
  set_id: number
} 