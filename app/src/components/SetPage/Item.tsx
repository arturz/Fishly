import React from 'react'
import { ListItem, makeStyles, Theme } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'

const useStyles = makeStyles((theme: Theme) => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
}))

interface Props {
  selected: boolean
  starred?: boolean
  reversedLanguage: boolean
  translated: string
  original: string
  onClick: () => void
}

export default ({ selected, starred, reversedLanguage, original, translated, onClick }: Props) => {
  const classes = useStyles({})

  return <ListItem button onClick={onClick} selected={selected} className={classes.item}> 
    {reversedLanguage ? original : translated } 
    {starred && <Rating readOnly value={1} max={1} size="small" />}
  </ListItem>
}