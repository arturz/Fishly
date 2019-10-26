import React, { ReactNode } from 'react'
import SingleCard from './StackedCards/SingleCard'
import { makeStyles } from '@material-ui/core'
import { CARD_COUNT } from './StackedCards/consts'

const useStyles = makeStyles(theme => ({
  stackedCards: {
    display: "inline-block",
    position: "relative",
    width: "12rem",
    height: "9rem",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: "pointer"
  }
}))

export default ({ children }: { children: ReactNode }) => {
  const classes = useStyles()

  return (
    <div className={classes.stackedCards}>
    {
      [...Array(CARD_COUNT)].map((value, index) =>
        <SingleCard key={index} index={index}>
        {
          index === CARD_COUNT - 1
            ? children
            : null
        }
        </SingleCard>
      )
    }
    </div>
  )
}