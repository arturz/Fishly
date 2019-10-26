import React from 'react'
import { Button, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'

export default () => {
  const isLogged = true

  return isLogged
    ? (
      <div>
        <Link to="/home" style={{ color: 'unset', textDecoration: 'unset' }}>
          <Button color="inherit">
            Zestawy
          </Button>
        </Link>
        <Link to="/account" style={{ color: 'unset' }}>
          <IconButton edge="end" color="inherit">
            <AccountCircle />
          </IconButton>
        </Link>
      </div>
    ) : (
      <Link to="/home" style={{ color: 'unset', textDecoration: 'unset' }}>
        <Button color="inherit">
          Zaloguj się
        </Button>
      </Link>
    )
}