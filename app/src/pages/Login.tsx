import React, { useState, useCallback } from 'react'
import { Theme, Container, makeStyles, Avatar, Typography, TextField, Button, CardContent, Card } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import fetchPost from '../utils/fetchPost'
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
  },
  button: {
    marginTop: theme.spacing(4)
  }
}))

export default () => {
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
  
  const handleSubmit = async event => {
    event.preventDefault()

    const { error, ...user } = await fetchPost('api/account/login.php', state)
    if(error){
      setError(error)
      return
    }

    console.log(user)
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
            <TextField label="Hasło" value={state.password} onChange={updateState('password')} />
            <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Zaloguj się
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  )
}