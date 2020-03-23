import fetch from '../../utils/fetch'

export default (setId: number) =>
  fetch(`api/set/get_set.php?setId=${setId}`)