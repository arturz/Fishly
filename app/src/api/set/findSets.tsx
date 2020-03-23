import fetch from '../../utils/fetch'

export default (name: string) =>
  fetch(`api/set/get_set.php?name=?${encodeURIComponent(name)}`)