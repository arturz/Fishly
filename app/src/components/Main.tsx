import { makeStyles, Theme } from '@material-ui/core'
import React, { ReactNode } from 'react'

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2, 0, 8),
    backgroundColor: theme.palette.background.paper
  },
}))

export default ({ children }: { children: ReactNode }) => {
  const classes = useStyles({})

  return (
    <main className={classes.main}>
    {
      children
    }
    </main>
  )
}