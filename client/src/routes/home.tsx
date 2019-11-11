import React from 'react'
import { Theme, Typography, Grid, makeStyles, Card, List, ListItem, CardContent, CardActions, Button } from '@material-ui/core'
import StackedCards from '../components/StackedCards'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    margin: theme.spacing(1, 0, 3)
  },
  sets: {
    margin: theme.spacing(2, 0),
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center'
    }
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Zestawy
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <List>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Opcje
                </Typography>
              </ListItem>
              <ListItem button>
                Dodaj zestaw
              </ListItem>
              <ListItem button>
                Wyszukaj
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h4">
            Zapisane
          </Typography>
          <Grid container spacing={1} className={classes.sets}>
            <Grid item>
              <StackedCards>
                <CardContent>
                  <Typography variant="h6">
                    siaa kaj ajka ka
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Usuń</Button>
                </CardActions>
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
          </Grid>
          <Typography variant="h4">
            Stworzone przez ciebie
          </Typography>
          <Grid container spacing={1} className={classes.sets}>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
            <Grid item>
              <StackedCards>
                asdasd
              </StackedCards>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}