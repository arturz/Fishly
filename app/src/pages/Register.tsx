import { Avatar, Button, Card, CardContent, Container, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import React, { useCallback, useState } from 'react'
import registration from '../api/account/registration'
import Alert from '../components/Alert'
import Header from '../components/Header'
import Main from '../components/Main'
import { captchaSiteKey } from '../redux/initialState'
const ReCAPTCHA = require("react-google-recaptcha")

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

enum RegistrationStates {
  Initial,
  Requesting,
  SentMail
}

export default () => {
  console.log('captchaSiteKey:', captchaSiteKey)

  const [registrationState, setRegistrationState] = useState(RegistrationStates.Initial)
  const [state, setState] = useState({
    login: '',
    password: '',
    repeatedPassword: '',
    email: '',
    firstname: '',
    lastname: ''
  })
  const [captcha, setCaptcha] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const updateState = (key: string) => useCallback(({ target: { value } }) =>
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

  const handleSubmit = async (event: React.FormEvent) => {
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
    <>
      <Header />
      <Main>
        <Container maxWidth="xs">
          <Card className={classes.card}>
            <CardContent className={classes.main}>
              { error && <Alert title="Błąd" handleClose={() => setError(null)}>{ error }</Alert> }
              { [RegistrationStates.Initial, RegistrationStates.Requesting].includes(registrationState)
                ? <>
                    <Avatar>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" className={classes.title}>Zarejestruj</Typography>
                    <form onSubmit={handleSubmit}>
                      <div className={classes.textFields}>
                        <TextField fullWidth label="Login" onChange={updateLogin} inputProps={{ required: true, minLength: 3 }} />
                        <TextField fullWidth label="Hasło" type="password" onChange={updatePassword} inputProps={{ required: true, minLength: 3 }} />
                        <TextField fullWidth label="Powtórz hasło" type="password" onChange={updateRepeatedPassword} inputProps={{ required: true, minLength: 3 }} />
                        <TextField fullWidth label="Email" type="email" onChange={updateEmail} inputProps={{ required: true, minLength: 3 }} />
                        <TextField fullWidth label="Imię" onChange={updateFirstname} inputProps={{ required: true, minLength: 3 }} />
                        <TextField fullWidth label="Nazwisko" onChange={updateLastname} />
                      </div>
                      <div>
                        <ReCAPTCHA sitekey={captchaSiteKey} onChange={setCaptcha} className={classes.gutterBottom} />
                        <Button fullWidth variant="contained" size="large" color="primary" type="submit" disabled={registrationState === RegistrationStates.Requesting}>
                          Zarejestruj się
                        </Button>
                      </div>
                    </form>
                  </>
                : <>
                    <Avatar>
                      <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">Mail aktywacyjny wysłany!</Typography>
                  </>}
            </CardContent>
          </Card>
        </Container>
      </Main>
    </>
  )
}