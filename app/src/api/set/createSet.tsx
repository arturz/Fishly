import fetch from '../../utils/fetch'

export default (name: string, subject: string, words: Object[]) => 
  fetch('api/set/create_set.php', { name, subject, words })