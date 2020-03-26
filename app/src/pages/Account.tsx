import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { makeStyles, Container, Typography, Grid, Card, List, ListItem, Divider, Theme } from '@material-ui/core'
import Set from '../components/Set'
import DeleteAccountDialog from '../components/AccountPage/DeleteAccountDialog'
import getAccount from '../api/account/getAccount'
import { useStateValue } from '../state'
import statuses from '../utils/statuses'
import banAccount from '../api/account/admin/banAccount'

const useStyles = makeStyles((theme: Theme) => ({
  notFoundText: {
    textAlign: 'center',
    margin: theme.spacing(16, 2, 12)
  },
  link: {
    color: 'unset',
    textDecoration: 'none'
  }
}))

export default () => {
  const [{ user }] = useStateValue()
  const { userId } = useParams()

  const [account, setAccount] = useState(null)

  useEffect(() => {
    getAccount(+userId).then(setAccount)
  }, [userId])

  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)

  const classes = useStyles({})
  if(account !== null && account.user_id === undefined)
    return <>
      <Header />
      <Main>
        <Typography variant="h4" className={classes.notFoundText}>Nie znaleziono użytkownika.</Typography>
      </Main>
    </>

  const isSelf = (user && user.userId) === userId

  const ban = async () => {
    await banAccount(+userId)
    location.reload()
  }

  return <>
    <Header />
    <Main>
      <Container maxWidth="md">
        {account === null || <Grid container spacing={3} direction="row-reverse">
          <Grid item xs={12} md={8}>
            {isSelf
              ? <Typography variant="h4" gutterBottom>Twoje konto</Typography>
              : <Typography variant="h4" gutterBottom>Użytkownik { account.login }</Typography>}
            <Typography variant="h6">Imię:</Typography>
            <Typography variant="body1" gutterBottom>{ account.firstname }</Typography>
            {isSelf && <>
              <Typography variant="h6">Nazwisko:</Typography>
              <Typography variant="body1" gutterBottom>{ account.lastname }</Typography>
              <Typography variant="h6">Login:</Typography>
              <Typography variant="body1" gutterBottom>{ account.login }</Typography>
              <Typography variant="h6">E-mail:</Typography>
              <Typography variant="body1" gutterBottom>{ account.email }</Typography>
            </>}
            <Typography variant="h6">Status:</Typography>
            <Typography variant="body1" gutterBottom>{ statuses[account.status] }</Typography>
            <br />
            {account.sets.length === 0 || <>
              <Typography variant="h6" gutterBottom>{ isSelf ? 'Twoje zestawy' : 'Zestawy użytkownika'}</Typography>
              {account.sets.map(({ name, subject, set_id }) => (
                <Link to={`/set/${set_id}`} key={set_id}>
                  <Set key={name} name={name} subject={subject} />
                </Link>
              ))}
            </>}
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
                {isSelf
                  ? <>
                      {deleteAccountDialog && <DeleteAccountDialog handleClose={() => setDeleteAccountDialog(value => !value)} />}
                      <ListItem button onClick={() => setDeleteAccountDialog(true)}>Usuń konto</ListItem>
                      {(user && (user.status == '2' || user.status == '3')) &&
                        <Link to="/admin" className={classes.link}>
                          <ListItem button>
                            Panel administratora
                          </ListItem>
                        </Link>}
                    </>
                  : (user && (user.status == '2' || user.status == '3'))
                    ? <>
                        <ListItem button onClick={ban}>Zbanuj użytkownika</ListItem>
                      </>
                    : <ListItem>brak</ListItem>}
              </List>
            </Card>
          </Grid>
        </Grid>}
      </Container>
    </Main>
  </>
}