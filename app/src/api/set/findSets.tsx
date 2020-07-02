import Set from '../../types/Set'
import fetch from '../../utils/fetch'

export default (name: string): Promise<Set[]> =>
  fetch(`api/set/find_sets.php?name=${encodeURIComponent(name)}`)