import { Button, Container, Grid, List, ListItem, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getAccounts from '../api/account/admin/getAccounts'
import deleteReport from '../api/set/admin/deleteReport'
import getReportedSets from '../api/set/admin/getReportedSets'
import Header from '../components/Header'
import Main from '../components/Main'
import Account from '../types/Account'
import Set from '../types/Set'
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

export default () => {
  const classes = useStyles({})

  const [accounts, setAccounts] = useState<Account[] | null>(null)
  useEffect(() => {
    getAccounts().then(setAccounts)
  }, [])

  const [reportedSets, setReportedSets] = useState<Set[] | null>(null)
  useEffect(() => {
    getReportedSets().then(setReportedSets)
  }, [])

  const delReport = (set_id: number) => {
    if(reportedSets !== null){
      deleteReport(set_id)
      setReportedSets(reportedSets.filter(reportedSet => reportedSet.set_id !== set_id))
    }
  }

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
              {reportedSets === null || reportedSets.map(({ set_id, name }) =>
                <ListItem className={classes.listRow} key={set_id}>
                  <Link to={`/set/${set_id}`} className={classes.link} target="_blank">{ name }</Link> 
                  <Button size="small" variant="outlined" color="primary" onClick={() => delReport(set_id)}>Usuń zgłoszenie</Button>
                </ListItem>
              )}
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