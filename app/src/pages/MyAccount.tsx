import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles, Container, Typography, Grid, CircularProgress, Card, List, ListItem, CardContent, CardActions, Button, Divider, Theme } from '@material-ui/core'
import Header from '../components/Header'
import Main from '../components/Main'
import RemoveAccountDialog from '../components/AccountPage/RemoveAccountDialog'
import { useStateValue } from '../state'

const statusNames = {
  'user': 'użytkownik',
  'admin': 'administrator',
  'head_admin': 'główny administrator'
}

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: 'unset',
    textDecoration: 'none'
  }
}))

export default () => {
  const [{ user }] = useStateValue()
  const [isRemoveAccountDialogOpen, setRemoveAccountDialogOpen] = useState(false)

  const classes = useStyles({}) 

  const toggleRemoveAccountDialog = () =>
    setRemoveAccountDialogOpen(prevState => !prevState)

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={8}>
              <Typography variant="h4">
                Twoje dane
              </Typography>
              <p>
                <Typography variant="h6">
                  Imię:
                </Typography>
                <Typography variant="body1">
                { user.firstname }
                </Typography>
              </p>
              <p>
                <Typography variant="h6">
                  Nazwisko:
                </Typography>
                <Typography variant="body1">
                { user.lastname }
                </Typography>
              </p>
              <p>
                <Typography variant="h6">
                  Login:
                </Typography>
                <Typography variant="body1">
                { user.login }
                </Typography>
              </p>
              <p>
                <Typography variant="h6">
                  E-mail:
                </Typography>
                <Typography variant="body1">
                { user.email }
                </Typography>
              </p>
              <Button variant="contained" color="primary">
                Zmień e-mail
              </Button>
              <p>
                <Typography variant="h6">
                  Status:
                </Typography>
                <Typography variant="body1">
                { statusNames[user.status] || 'nieznany' }
                </Typography>
              </p>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6" gutterBottom>
                      Dodatkowe opcje
                    </Typography>
                  </ListItem>
                  <Divider />
                  <ListItem button onClick={toggleRemoveAccountDialog}>
                    Usuń konto
                  </ListItem>
                  <Link to="/admin" className={classes.link}>
                    <ListItem button>
                      Panel administratora
                    </ListItem>
                  </Link>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
        { 
          isRemoveAccountDialogOpen && <RemoveAccountDialog onClose={toggleRemoveAccountDialog} />
        }
      </Main>
    </>
  )
}