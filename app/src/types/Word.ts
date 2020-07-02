import LanguagesPair from "./LanguagesPair";

export default interface Word extends LanguagesPair {
  word_id: string
  starred?: boolean
}