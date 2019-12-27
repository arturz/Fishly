import React, { useState, useCallback } from 'react'
import { Theme, Container, makeStyles, Avatar, Typography, TextField, Button, CardContent, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import ReCAPTCHA from "react-google-recaptcha"
import fetchPost from '../utils/fetchPost'

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
    mail: '',
    firstname: '',
    lastname: ''
  })
  const [captcha, setCaptcha] = useState(null)

  const updateState = key => useCallback(({ target: { value } }) =>
    setState(state => ({
      ...state,
      [key]: value
    })), [])

  const handleSubmit = async event => {
    event.preventDefault()

    console.log(
      await fetchPost('api/register', { captcha, ...state })
    )
  }

  const classes = useStyles({})
  return (
    <Container maxWidth="xs">
      <Card className={classes.card}>
        <CardContent>
          <form className={classes.form} onSubmit={handleSubmit}>
            <Avatar>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3" className={classes.title}>
              Zarejestruj
            </Typography>
            <TextField label="Login" onChange={updateState('login')} />
            <TextField label="Hasło" type="password" onChange={updateState('password')} />
            <TextField label="Powtórz hasło" type="password" onChange={updateState('repeatedPassword')} />
            <TextField label="Email" onChange={updateState('mail')} />
            <TextField label="Twoje imię" onChange={updateState('firstname')} />
            <TextField label="Twoje nazwisko" onChange={updateState('lastname')} />
            <br />
            <ReCAPTCHA 
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={setCaptcha}
            />
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