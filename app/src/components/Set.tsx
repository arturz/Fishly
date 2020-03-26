import React, { memo } from 'react'
import SingleCard from './StackedCards/SingleCard'
import { makeStyles, CardContent, Typography } from '@material-ui/core'
import { CARD_COUNT } from './StackedCards/consts'

const useStyles = makeStyles(theme => ({
  stackedCards: {
    display: "inline-block",
    position: "relative",
    width: "12rem",
    height: "6rem",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: "pointer"
  }
}))

export default memo(({ name, subject }: { name: string, subject: string }) => {
  const classes = useStyles({})

  return (
    <div className={classes.stackedCards}>
    {
      [...Array(CARD_COUNT)].map((value, index) => {
        if(index !== CARD_COUNT - 1)
          return <SingleCard key={index} index={index} />

        return (
          <SingleCard key={index} index={index}>
            <CardContent>
              <Typography variant="body1">
              {
                name
              }
              </Typography>
              <Typography variant="caption">
              {
                subject
              }
              </Typography>
            </CardContent>
          </SingleCard>
        )
      })
    }
    </div>
  )
})