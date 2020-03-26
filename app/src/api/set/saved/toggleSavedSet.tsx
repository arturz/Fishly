import fetch from '../../../utils/fetch'

export default (setId: number) => 
  fetch('api/set/saved/toggle_saved_set.php', { setId })