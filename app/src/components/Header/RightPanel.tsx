import { Button, IconButton, makeStyles } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { logOut } from '../../redux/actions'
import { useStateValue } from '../../redux/state'
import fetch from '../../utils/fetch'

const useStyles = makeStyles(() => ({
  link: { 
    color: 'unset',
    textDecoration: 'unset'
  }
}))

export default () => {
  const [{ user }, dispatch] = useStateValue()
  const classes = useStyles({})

  const _logOut = useCallback(() => {
    dispatch(logOut())
    fetch('api/account/logout.php')
    document.cookie = 'PHPSESSID=;path=/;'
  }, [])

  if(user)
    return (
      <div>
        <Button color="inherit" onClick={_logOut}>
          Wyloguj
        </Button>
        <Link to={`/account/${user.userId}`} className={classes.link}>
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