import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import deleteAccount from '../../api/account/deleteAccount'
import { logOut } from '../../redux/actions'
import { useStateValue } from '../../redux/state'

enum DialogStates {
  Initial,
  Requesting,
  WrongPassword,
  Deleted
}

export default ({ handleClose }: { handleClose: () => any }) => {
  const [dialogState, setDialogState] = useState(DialogStates.Initial)
  const [password, setPassword] = useState('')
  const [, dispatch] = useStateValue()

  const handleDeleteClick = async () => {
    setDialogState(DialogStates.Requesting)
    const result = await deleteAccount(password)
    if('error' in result){
      console.warn(result.error)
      setDialogState(DialogStates.WrongPassword)
      return
    }

    setDialogState(DialogStates.Deleted)
  }

  if(dialogState === DialogStates.Deleted)
    return (
      <Dialog open={true} onClose={() => dispatch(logOut())}>
        <DialogTitle>Konto zostało usunięte.</DialogTitle>
        <DialogActions>
          <Button onClick={() => dispatch(logOut())} color="primary" autoFocus>
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    )

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>Usuwanie konta</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Musisz podać hasło, by potwierdzić swoją toższamość.
        </DialogContentText>
        <TextField
          autoFocus
          label="Hasło"
          margin="dense"
          type="password"
          fullWidth
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
          { ...dialogState === DialogStates.WrongPassword && {
            error: true,
            helperText: 'Złe hasło'
          } }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDeleteClick} color="secondary" disabled={dialogState === DialogStates.Requesting}>
          Usuń konto
        </Button>
        <Button onClick={handleClose} color="primary" autoFocus disabled={dialogState === DialogStates.Requesting}>
          Anuluj
        </Button>
      </DialogActions>
    </Dialog>
  )
}