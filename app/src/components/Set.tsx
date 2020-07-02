import { CardContent, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { memo } from 'react'
import { CARD_COUNT } from './StackedCards/consts'
import SingleCard from './StackedCards/SingleCard'

interface StyleProps {
  name: string
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  stackedCards: {
    display: "inline-block",
    position: "relative",
    width: "13rem",
    height: "7rem",
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    cursor: "pointer"
  },
  name: {
    lineHeight: '1.2rem',
    overflowWrap: 'break-word'
  }
}))

export default memo(({ name, subject }: { name: string, subject?: string }) => {
  const classes = useStyles({ name })

  return (
    <div className={classes.stackedCards}>
    {
      [...Array(CARD_COUNT)].map((value, index) => {
        if(index !== CARD_COUNT - 1)
          return <SingleCard key={index} index={index} />

        return (
          <SingleCard key={index} index={index}>
            <CardContent>
              <Typography variant="body1" className={classes.name} gutterBottom>{ name }</Typography>
              <Typography variant="caption">{ subject }</Typography>
            </CardContent>
          </SingleCard>
        )
      })
    }
    </div>
  )
})