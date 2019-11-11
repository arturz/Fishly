import React from 'react'
import { Theme, Grid, Card, List, ListItem, Typography, makeStyles, Button } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  header: {
    margin: theme.spacing(1, 0, 3)
  },
  list: {
    listStylePosition: 'inside',
    padding: 0,
    margin: 0
  },
  paragraph: {
    marginTop: theme.spacing(0)
  }
}))

export default () => {
  const classes = useStyles()

  return (
    <>
      <Typography variant="h4" className={classes.header}>
        Twoje konto
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <Card>
            <List>
              <ListItem>
                <Typography variant="h6" gutterBottom>
                  Zarządzaj
                </Typography>
              </ListItem>
              <ListItem button>
                Zmień hasło
              </ListItem>
              <ListItem button>
                Zmień e-mail
              </ListItem>
              <ListItem button>
                Usuń konto
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Typography variant="h4">
            Dane
          </Typography>
          <p>
            <Typography variant="h6">
              Login:
            </Typography>
            asddas
          </p>
          <p>
            <Typography variant="h6">
              E-mail:
            </Typography>
            jakismail@gmail.com
          </p>
          <Button variant="contained">
            Zmień e-mail
          </Button>
          <p>
            <Typography variant="h6">
              Status użytkownika:
            </Typography>
            uczeń (niezweryfikowany)
          </p>
        </Grid>
      </Grid>
    </>
  )
}