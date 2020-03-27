import React, { useState, useEffect } from 'react'
import { Typography, Paper, InputBase, IconButton, makeStyles, Theme } from '@material-ui/core'
import DirectionsIcon from '@material-ui/icons/Directions'
import throttle from 'lodash.throttle'
import SetsGroup from '../SetsGroup'
import findSets from '../../api/set/findSets'

const useStyles = makeStyles((theme: Theme) => ({
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
  }
}))

const find = throttle(async (name: string) => {
  const sets = await findSets(name)
  return sets
}, 300)

export default () => {
  const [name, setName] = useState('')
  const [foundSets, setFoundSets] = useState(null)

  useEffect(() => {
    if(name)
      find(name).then(setFoundSets)
    else
      setFoundSets([])
  }, [name])
  
  const classes = useStyles({})
  return <>
    <Typography variant="h5" gutterBottom>
      Wyszukaj zestaw
    </Typography>
    <Paper component="form" className={classes.findContainer}>
      <InputBase placeholder="Część nazwy zestawu" className={classes.findInput} value={name} onChange={({ target: { value } }) => setName(value)} />
      <IconButton type="submit" className={classes.findButton}>
        <DirectionsIcon />
      </IconButton>
    </Paper>
    {foundSets === null || <SetsGroup sets={foundSets} justifyContent="flex-start" />}
  </>
}