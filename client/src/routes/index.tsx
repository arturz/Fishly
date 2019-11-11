import React from 'react'
import { Typography, Button, Stepper, Step, StepLabel, makeStyles } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'

const useStyles = makeStyles(theme => ({
  text: {
    textAlign: 'center',
    marginBottom: theme.spacing(8)
  },
  jumbotron: {
    margin: theme.spacing(16, 0, 8)
  }
}))

export default () => {
  const classes = useStyles()
  
  return (
    <div className={classes.jumbotron}>
      <Typography variant="h1" gutterBottom className={classes.text}>
        Fishly
      </Typography>
      <Stepper activeStep={0} alternativeLabel>
        <Step>
          <StepLabel>
            <Button variant="contained" color="primary">
              Załóż konto
            </Button>
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
    </div>
  )
}