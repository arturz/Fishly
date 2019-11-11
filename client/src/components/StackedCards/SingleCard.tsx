import React, { ReactNode } from 'react'
import { Card, makeStyles, Theme } from '@material-ui/core'
import random from 'random-int'
import { CARD_COUNT } from './consts'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: ({ index }: { index: number }) => -theme.spacing(1) * index * 0.5,
    left: ({ index }: { index: number }) => -theme.spacing(1) * index * 0.5,
    "&:hover": {
      top: ({ index }: { index: number }) => -theme.spacing(1) * index
    },
    transition: "0.3s",
    transform: ({ index }: { index: number }) => index === CARD_COUNT - 1 
      ? "unset" 
      : `rotate(${random(-3, 3)}deg)`
  }
}))

export default ({ index, children }: { index: number, children: ReactNode }) => {
  const classes = useStyles({ index })

  return (
    <Card className={classes.card}>
      {children}
    </Card>
  )
}