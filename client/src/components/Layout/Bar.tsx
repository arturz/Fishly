import React from 'react'
import { AppBar, Toolbar, Typography, Container, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import UserButton from './Bar/UserButton'

const useStyles = makeStyles(theme => ({
  title: {
    flexGrow: 1
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Fishly
            </Link>
          </Typography>
          <UserButton />
        </Toolbar>
      </Container>
    </AppBar>
  )
}