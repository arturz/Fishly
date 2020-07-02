import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import React from 'react'

export default ({ title, children, handleClose }: { title: string, children: React.ReactChild, handleClose: () => any }) =>
  <Dialog open={true} onClose={handleClose} fullWidth={true} maxWidth="xs">
    <DialogTitle>
    {
      title
    }
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
      {
        children
      }
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary" autoFocus>
        Zamknij
      </Button>
    </DialogActions>
  </Dialog>