import fetch from '../../utils/fetch'

export default (name: string) =>
  fetch(`api/set/find_sets.php?name=${encodeURIComponent(name)}`)