import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { makeStyles, Container, Typography, Grid, CircularProgress, Card, List, ListItem, CardContent, CardActions, Button, Divider, Theme } from '@material-ui/core'
import sets from '../mocks/sets'
import users from '../mocks/users'
import getAccounts from '../api/account/admin/getAccounts'
import statuses from '../utils/statuses'

const useStyles = makeStyles((theme: Theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper
  },
  title: {
    margin: theme.spacing(8, 0),
    textAlign: 'center'
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  listRow: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

const reported = [sets[0]]

export default () => {
  const classes = useStyles({})

  const [accounts, setAccounts] = useState(null)
  useEffect(() => {
    getAccounts().then(setAccounts)
  }, [])

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="lg">
          <Typography variant="h3" className={classes.title}>
            Panel administratora 
          </Typography>
          <Grid container spacing={3} direction="row">
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Zgłoszone fiszki
              </Typography>
              <List className={classes.list} dense>
              {
                reported.map(({ name, subject, id }) => (
                  <ListItem className={classes.listRow} key={id}>
                    <Link to={`/set/${id}`} className={classes.link} target="_blank">
                      <span>{ name } ({ subject })</span>
                    </Link> 
                    <Button size="small" variant="outlined" color="primary">Usuń zgłoszenie</Button>
                  </ListItem>
                ))
              }
              </List>
            </Grid> 
            <Grid item xs={12} lg={6}>
              <Typography variant="h4" gutterBottom>
                Spis użytkowników
              </Typography> 
              <List className={classes.list} dense>
              {accounts === null || accounts.map(({ user_id, login, status }) =>
                <ListItem className={classes.listRow} key={user_id}>
                  <Link to={`/account/${user_id}`} className={classes.link} target="_blank">
                    <Typography variant="body1">{ login }</Typography>
                  </Link> 
                  <Typography variant="body1">{ statuses[status] }</Typography>
                </ListItem>
              )}
              </List> 
            </Grid>
          </Grid>
        </Container>
      </Main>
    </>
  )
}