import React from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Set from './Set'

interface StyleProps {
  spacing: number
  justifyContent: string
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  setsGroup: {
    paddingBottom: theme.spacing(4),
    display: 'flex',
    justifyContent: ({ justifyContent }) => justifyContent,
    flexWrap: 'wrap',
    '& > *': {
      margin: ({ spacing = 1 }) => theme.spacing(0, spacing, 1)
    }
  }
}))

export default ({ sets, spacing = 1, justifyContent = 'center' }) => {
  const classes = useStyles({ spacing, justifyContent })

  if(sets.length === 0)
    return <div />

  return (
    <div className={classes.setsGroup}>
      {sets.map(({ name, subject, set_id }) => (
        <Link to={`/set/${set_id}`} key={set_id}>
          <Set key={name} name={name} subject={subject} />
        </Link>
      ))}
    </div>
  )
}