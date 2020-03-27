import React, { useState, useCallback } from 'react'
import { Theme, Container, makeStyles, Avatar, Typography, TextField, Button, CardContent, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ReCAPTCHA from "react-google-recaptcha"
import { captchaSitekey } from '../config/captcha'
import registration from '../api/account/registration'
import Alert from '../components/Alert'

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
  }
}))

enum RegistrationStates {
  Initial,
  Requesting,
  SentMail
}

export default () => {
  const [registrationState, setRegistrationState] = useState(RegistrationStates.Initial)
  const [state, setState] = useState({
    login: '',
    password: '',
    repeatedPassword: '',
    email: '',
    firstname: '',
    lastname: ''
  })
  const [captcha, setCaptcha] = useState(null)
  const [error, setError] = useState(null)

  const updateState = key => useCallback(({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    })), [])

  const updateLogin = updateState('login')
  const updatePassword = updateState('password')
  const updateRepeatedPassword = updateState('repeatedPassword')
  const updateEmail = updateState('email')
  const updateFirstname = updateState('firstname')
  const updateLastname = updateState('lastname')

  const handleSubmit = async event => {
    event.preventDefault()

    if(state.password !== state.repeatedPassword){
      setError('Hasła nie są takie same!')
      return
    }

    setRegistrationState(RegistrationStates.Requesting)
    const result = await registration({ captcha, ...state })
    console.log('registration result:', result)
    if('error' in result){
      setRegistrationState(RegistrationStates.Initial)
      setError(result.error)
      return
    }

    setRegistrationState(RegistrationStates.SentMail)
  }

  const classes = useStyles({})
  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
        {
          [RegistrationStates.Initial, RegistrationStates.Requesting].includes(registrationState) ? (
            <form className={classes.form} onSubmit={handleSubmit}>
              {
                error && <Alert title="Błąd" handleClose={() => setError(null)}>{ error }</Alert>
              }
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h3" className={classes.title}>
                Zarejestruj
              </Typography>
              <TextField label="Login" onChange={updateLogin} inputProps={{ required: true, minLength: 3 }} />
              <TextField label="Hasło" type="password" onChange={updatePassword} inputProps={{ required: true, minLength: 3 }} />
              <TextField label="Powtórz hasło" type="password" onChange={updateRepeatedPassword} inputProps={{ required: true, minLength: 3 }} />
              <TextField label="Email" type="email" onChange={updateEmail} inputProps={{ required: true, minLength: 3 }} />
              <TextField label="Imię" onChange={updateFirstname} inputProps={{ required: true, minLength: 3 }} />
              <TextField label="Nazwisko" onChange={updateLastname} />
              <br />
              <ReCAPTCHA sitekey={captchaSitekey} onChange={setCaptcha} />
              <br />
              <Button variant="contained" color="primary" type="submit" disabled={registrationState === RegistrationStates.Requesting}>
                Zarejestruj się
              </Button>
            </form>
          ) : (
            <form className={classes.form}>
              <Avatar>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className={classes.title}>
                Mail aktywacyjny wysłany!
              </Typography>
            </form>
          )
        }
        </CardContent>
      </Card>
    </Container>
  )
}