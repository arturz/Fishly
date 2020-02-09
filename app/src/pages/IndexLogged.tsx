import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Main from '../components/Main'
import { Container, Theme, Typography, Grid, makeStyles, Card, List, ListItem, CardContent, CardActions, Button, TextField, Divider, IconButton, InputBase, Paper } from '@material-ui/core'
import DirectionsIcon from '@material-ui/icons/Directions'
import { useStateValue } from '../state'
import Set from '../components/Set'
import sets from '../mocks/sets'

const useStyles = makeStyles((theme: Theme) => ({
  hello: {
    margin: theme.spacing(8, 0)
  }, 
  findContainer: {
    display: 'flex',
    marginBottom: theme.spacing(4)
  },
  findInput: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  findButton: {
    padding: 10
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

  const classes = useStyles({})

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom align="center" className={classes.hello}>
            Witaj, { firstname }!
          </Typography>
          <Typography variant="h5" gutterBottom>
            Wyszukaj zestaw
          </Typography>
          <Paper component="form" className={classes.findContainer}>
            <InputBase placeholder="Część nazwy zestawu" className={classes.findInput} />
            <IconButton type="submit" className={classes.findButton}>
              <DirectionsIcon />
            </IconButton>
          </Paper>
          <Typography variant="h5" gutterBottom>
            Zapisane zestawy
          </Typography>
          <div className={classes.grouppedSets}>
          {
            sets.map(({ name, subject }, index) => (
              <Link to={`/set/${index}`} key={index}>
                <Set key={name} name={name} subject={subject} />
              </Link>
            ))
          }
          </div>
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