import { Card, Container, Divider, Grid, List, ListItem, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import banAccount from '../api/account/admin/banAccount'
import getAccount from '../api/account/getAccount'
import DeleteAccountDialog from '../components/AccountPage/DeleteAccountDialog'
import Header from '../components/Header'
import Main from '../components/Main'
import SetsGroup from '../components/SetsGroup'
import { useStateValue } from '../redux/state'
import Account from '../types/Account'
import { isPrivateAccount } from '../types/guards/isPrivateAccount'
import statuses from '../utils/statuses'

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

interface Params {
  userId: string
}

export default () => {
  const [{ user }] = useStateValue()
  const params = useParams<Params>()
  const userId = parseInt(params.userId, 10)

  const [account, setAccount] = useState<Account | null>(null)

  useEffect(() => {
    getAccount(userId).then(setAccount)
  }, [userId])

  const [deleteAccountDialog, setDeleteAccountDialog] = useState(false)

  const classes = useStyles({})
  if(account?.user_id === undefined)
    return <>
      <Header />
      <Main>
        <Typography variant="h4" className={classes.notFoundText}>Nie znaleziono użytkownika.</Typography>
      </Main>
    </>

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
            {isPrivateAccount(account, user)
              ? <Typography variant="h4" gutterBottom>Twoje konto</Typography>
              : <Typography variant="h4" gutterBottom>Użytkownik { account.login }</Typography>}
            <Typography variant="h6">Imię:</Typography>
            <Typography variant="body1" gutterBottom>{ account.firstname }</Typography>
            {isPrivateAccount(account, user) && <>
              <Typography variant="h6">Nazwisko:</Typography>
              <Typography variant="body1" gutterBottom>{ account.lastname || 'nie podano' }</Typography>
              <Typography variant="h6">Login:</Typography>
              <Typography variant="body1" gutterBottom>{ account.login }</Typography>
              <Typography variant="h6">E-mail:</Typography>
              <Typography variant="body1" gutterBottom>{ account.email }</Typography>
            </>}
            <Typography variant="h6">Status:</Typography>
            <Typography variant="body1" gutterBottom>{ statuses[account.status] }</Typography>
            <br />
            {account.sets.length === 0 || <>
              <Typography variant="h6" gutterBottom>{ isPrivateAccount(account, user) ? 'Twoje zestawy' : 'Zestawy użytkownika'}</Typography>
              <SetsGroup sets={account.sets} justifyContent="flex-start" />
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
                {isPrivateAccount(account, user)
                  ? <>
                      {deleteAccountDialog && <DeleteAccountDialog handleClose={() => setDeleteAccountDialog(value => !value)} />}
                      <ListItem button onClick={() => setDeleteAccountDialog(true)}>Usuń konto</ListItem>
                      {(user && (user.status === 2 || user.status === 3)) &&
                        <Link to="/admin" className={classes.link}>
                          <ListItem button>
                            Panel administratora
                          </ListItem>
                        </Link>}
                    </>
                  : (user && (user.status === 2 || user.status === 3))
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