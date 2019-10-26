import React, { ReactNode } from 'react'
import Bar from './Layout/Bar'
import { Container, makeStyles, Typography, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    'html, body, #root': { height: '100%' },
    '#root': {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  wrapper: {
    flexGrow: 1
  },
  footer: {
    flexShrink: 0,
    textAlign: 'center',
    padding: theme.spacing(1, 2)
  },
  main: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(2),
  },
  background: {
    backgroundColor: theme.palette.background.paper
  }
}))

export default ({ children }: { children: ReactNode }) => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.wrapper}>
        <Bar />
        <div className={classes.background}>
          <Container className={classes.main} maxWidth="md" component="main">
          {
            children
          }
          </Container>
        </div>
      </div>
      <footer className={classes.footer}>
        <Typography variant="subtitle1" color="textSecondary">
          Fishly &copy; { new Date().getFullYear() }
        </Typography>
      </footer>
    </>
  )
}