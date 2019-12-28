import React, { useCallback } from 'react'
import { Button, IconButton, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { useStateValue } from '../../state'
import fetchPost from '../../utils/fetchPost'

const useStyles = makeStyles(() => ({
  link: { 
    color: 'unset',
    textDecoration: 'unset'
  }
}))

export default () => {
  const [{ user }, dispatch] = useStateValue()
  const classes = useStyles({})

  const logOut = useCallback(() => {
    dispatch({ type: 'logOut' })
    fetchPost('api/account/logout.php')
    document.cookie = 'PHPSESSID='
  }, [])

  if(user)
    return (
      <div>
        <Button color="inherit" onClick={logOut}>
          Wyloguj
        </Button>
        <Link to="/account" className={classes.link}>
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Link>
      </div>
    )

  return (
    <div>
      <Link to="/login" className={classes.link}>
        <Button color="inherit">
          Zaloguj
        </Button>
      </Link>
      <Link to="/register" className={classes.link}>
        <Button color="inherit">
          Zarejestruj
        </Button>
      </Link>
    </div>
  )
}