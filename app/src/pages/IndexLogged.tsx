import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { Container, Theme, Typography, makeStyles, Button } from '@material-ui/core'
import { useStateValue } from '../state'
import getSavedSets from '../api/set/saved/getSavedSets'
import Find from '../components/IndexLogged/Find'
import getCreatedSets from '../api/set/getCreatedSets'
import SetsGroup from '../components/SetsGroup'

const useStyles = makeStyles((theme: Theme) => ({
  hello: {
    margin: theme.spacing(8, 0),
    fontWeight: 500
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

  const [createdSets, setCreatedSets] = useState([])
  useEffect(() => {
    getCreatedSets().then(setCreatedSets)
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
            <SetsGroup sets={savedSets} />
          </>}
          <Typography variant="h5" gutterBottom>
            Twoje zestawy
          </Typography>
          {createdSets.length === 0 
            ? <Typography variant="body1" gutterBottom>brak</Typography>
            : <SetsGroup sets={createdSets} />}
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