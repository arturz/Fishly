import { Avatar, Button, Card, CardContent, Container, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import logIn from '../api/account/logIn'
import Alert from '../components/Alert'
import Header from '../components/Header'
import Main from '../components/Main'
import { logIn as dispatchLogIn } from '../redux/actions'
import { useStateValue } from '../redux/state'

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    'body': {
      backgroundColor: theme.palette.background.paper
    }
  },
  card: { margin: theme.spacing(8, 0) },
  title: { margin: theme.spacing(2, 0) },
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: theme.spacing(4)
  },
  textFields: {
    '& > *': { marginBottom: theme.spacing(1) },
    '& > *:last-of-type': { marginBottom: theme.spacing(3) }
  },
  gutterBottom: { marginBottom: theme.spacing(2) },
  link: { textDecoration: 'none', color: theme.palette.primary.main }
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
  const [error, setError] = useState<string | null>(null)

  const updateState = (key: string) => useCallback(({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    })), [])
  
  const [, dispatch] = useStateValue()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    setLogInState(LogInStates.Requesting)
    const result = await logIn(state)
    setLogInState(LogInStates.Initial)
    if('error' in result){
      setError(result.error)
      return
    }
    
    const { user, token } = result

    sessionStorage.setItem('token', token)
    dispatch(dispatchLogIn(user))
  }
  
  const classes = useStyles({})
  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="xs">
          <Card className={classes.card}>
            <CardContent className={classes.main}>
              { error && <Alert title="Błąd" handleClose={() => setError(null)}>{ error }</Alert> }
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h3" className={classes.title}>Zaloguj</Typography>
              <form onSubmit={handleSubmit}>
                <div className={classes.textFields}>
                  <TextField fullWidth label="Login" value={state.login} onChange={updateState('login')} />
                  <TextField fullWidth label="Hasło" type="password" value={state.password} onChange={updateState('password')} />
                </div>
                <div>
                  <Button fullWidth type="submit" variant="contained" color="primary" size="large" className={classes.gutterBottom} disabled={logInState === LogInStates.Requesting}>
                    Zaloguj się
                  </Button>
                  <Link to="/register" className={classes.link}>
                    Nie masz konta? Zarejestruj się
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </Container>
      </Main>
    </>
  )
}