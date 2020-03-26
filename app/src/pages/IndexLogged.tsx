import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { Container, Theme, Typography, Grid, makeStyles, Card, List, ListItem, CardContent, CardActions, Button, TextField, Divider, IconButton, InputBase, Paper } from '@material-ui/core'
import DirectionsIcon from '@material-ui/icons/Directions'
import throttle from 'lodash.throttle'
import { useStateValue } from '../state'
import Set from '../components/Set'
import sets from '../mocks/sets'
import findSets from '../api/set/findSets'
import getSavedSets from '../api/set/saved/getSavedSets'
import Find from '../components/IndexLogged/Find'

const useStyles = makeStyles((theme: Theme) => ({
  hello: {
    margin: theme.spacing(8, 0)
  }, 
  grouppedSets: {
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0, 1, 1)
    }
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  }
}))

export default () => {
  const [{ user: { firstname } }] = useStateValue()

  const [savedSets, setSavedSets] = useState([])
  useEffect(() => {
    getSavedSets().then(setSavedSets)
  }, [])

  const classes = useStyles({})
  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom align="center" className={classes.hello}>
            Witaj, { firstname }!
          </Typography>
          <Find />
          {savedSets.length === 0 || <>
            <Typography variant="h5" gutterBottom>
              Zapisane zestawy
            </Typography>
            <div className={classes.grouppedSets}>
              {savedSets.map(({ name, subject, set_id }) => (
                <Link to={`/set/${set_id}`} key={set_id}>
                  <Set key={name} name={name} subject={subject} />
                </Link>
              ))}
            </div>
          </>}
          <Typography variant="h5" gutterBottom>
            Twoje zestawy
          </Typography>
          <Typography variant="body1" gutterBottom>
            brak
          </Typography>
          <Link to="/createset" className={classes.link}>
            <Button variant="outlined" color="primary">
              Stwórz nowy zestaw
            </Button>
          </Link>
        </Container>
      </Main>
    </>
  )
}