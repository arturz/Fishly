import { Button, Container, makeStyles, Step, StepLabel, Stepper, Typography } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getLastestSets from '../api/set/getLatestSets'
import Header from '../components/Header'
import Main from '../components/Main'
import SetsGroup from '../components/SetsGroup'
import Set from '../types/Set'

const useStyles = makeStyles(theme => ({
  logo: {
    textAlign: 'center',
    marginBottom: theme.spacing(8),
    fontWeight: 500,
    fontSize: '8rem'
  },
  jumbotron: {
    margin: theme.spacing(16, 0)
  },
  link: { 
    color: 'unset',
    textDecoration: 'unset'
  },
  latest: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  latestText: {
    color: theme.palette.grey[500],
    fontWeight: 300,
    marginBottom: theme.spacing(4)
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
}))

export default () => {
  const classes = useStyles({})

  const [latestSets, setLatestSets] = useState<Set[] | null>(null)
  useEffect(() => {
    getLastestSets().then(setLatestSets)
  }, [])
  
  return (
    <>
      <Header />
      <Main>
        <div className={classes.jumbotron}>
          <Container>
            <Typography variant="h1" gutterBottom className={classes.logo}>
              Fishly
            </Typography>
            <Stepper activeStep={0} alternativeLabel>
              <Step>
                <StepLabel>
                  <Link to="/register" className={classes.link}>
                    <Button variant="contained" color="primary" size="large">
                      Załóż konto
                    </Button>
                  </Link>
                </StepLabel>
              </Step>
              <Step>
                <StepLabel>
                  Ucz się z Fishly
                </StepLabel>
              </Step>
              <Step>
                <StepLabel StepIconComponent={CheckIcon}>
                  Zdawaj egzaminy
                </StepLabel>
              </Step>
            </Stepper>
          </Container>
        </div>
        <Container maxWidth="md" className={classes.latest}>
          <Typography variant="h5" className={classes.latestText}>Ostatnio dodane zestawy</Typography>
          {latestSets !== null && <SetsGroup sets={latestSets} spacing={4} />}
        </Container>
      </Main>
    </>
  )
}