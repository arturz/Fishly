import React, { useState, useCallback } from 'react'
import { Theme, Container, makeStyles, Avatar, Typography, TextField, Button, CardContent, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import fetch from '../utils/fetch'
import Alert from '../components/Alert'
import { useStateValue } from '../state'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    'body': {
      backgroundColor: theme.palette.background.paper
    }
  },
  card: {
    margin: theme.spacing(8, 0)
  },
  title: {
    margin: theme.spacing(2, 0)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(4)
  }
}))

enum LogInStates {
  Initial,
  Requesting
}

export default () => {
  const [logInState, setLogInState] = useState(LogInStates.Initial)
  const [state, setState] = useState({
    login: '',
    password: ''
  })
  const [error, setError] = useState(null)

  const updateState = key => useCallback(({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    })), [])
  
  const [, dispatch] = useStateValue()
  const handleSubmit = async event => {
    event.preventDefault()

    setLogInState(LogInStates.Requesting)
    const { error, user, token } = await fetch('api/account/login.php', state)
    setLogInState(LogInStates.Initial)
    if(error){
      setError(error)
      return
    }

    console.log(user, token)

    sessionStorage.setItem('token', token)
    dispatch({ type: 'logIn', payload: { user } })
  }
  
  const classes = useStyles({})
  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
          <form onSubmit={handleSubmit} className={classes.form}>
            {
              error && <Alert title="Błąd" handleClose={() => setError(null)}>{ error }</Alert>
            }
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3" className={classes.title}>
              Zaloguj
            </Typography>
            <TextField label="Login" value={state.login} onChange={updateState('login')} />
            <TextField label="Hasło" type="password" value={state.password} onChange={updateState('password')} />
            <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={logInState === LogInStates.Requesting}>
              Zaloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}