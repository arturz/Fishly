import React, { useState, useCallback } from 'react'
import { Theme, Container, makeStyles, Avatar, Typography, TextField, Button, CardContent, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ReCAPTCHA from "react-google-recaptcha"
import fetchPost from '../utils/fetchPost'
import Alert from '../components/Alert'

const captchaSitekey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'

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

export default () => {
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

  const handleSubmit = async event => {
    event.preventDefault()

    if(state.password !== state.repeatedPassword){
      setError('Hasła nie są takie same!')
      return
    }

    const { error } = await fetchPost('api/account/registration.php', { captcha, ...state })
    if(error){
      setError(error)
      return
    }
  }

  const classes = useStyles({})
  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
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
            <TextField label="Login" onChange={updateState('login')} />
            <TextField label="Hasło" type="password" onChange={updateState('password')} />
            <TextField label="Powtórz hasło" type="password" onChange={updateState('repeatedPassword')} />
            <TextField label="Email" onChange={updateState('email')} />
            <TextField label="Twoje imię" onChange={updateState('firstname')} />
            <TextField label="Twoje nazwisko" onChange={updateState('lastname')} />
            <br />
            <ReCAPTCHA sitekey={captchaSitekey} onChange={setCaptcha} />
            <br />
            <Button variant="contained" color="primary" type="submit">
              Zarejestruj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}