import React, { useState, useCallback, useRef, useEffect } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { Container, Theme, Typography, Grid, makeStyles, Card, List, ListItem, CardContent, CardActions, Button, TextField, Divider, IconButton, InputBase, Paper, FormControl, InputLabel, Select, CircularProgress } from '@material-ui/core'
import createSet from '../api/set/createSet'
import { useHistory, useParams } from 'react-router-dom'
import getSet from '../api/set/getSet'
import Word from '../components/CreateSetPage/Word'

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginBottom: theme.spacing(2),
    '& > *': {
      marginBottom: theme.spacing(1)
    },
    maxWidth: '400px'
  },
  wordsContainer: {
    marginBottom: theme.spacing(2)
  },
  wordsRow: {
    '& > *': {
      marginRight: theme.spacing(1)
    }
  }
}))

export default () => {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')

  const [lastWordId, setLastWordId] = useState(0)
  const incrementLastWordId = () => {
    setLastWordId(lastWordId => lastWordId + 1)
    return lastWordId + 1
  }

  const [words, setWords] = useState([{ original: '', translated: '', word_id: lastWordId }])

  const handleChangeWord = word_id => ({ original, translated }) =>
    setWords(words => {
      const _words = [...words]
      const word = _words.find((word) => word.word_id === word_id)
      //slowo moglo zostac usuniete
      if(word === undefined)
        return words

      
      word.original = original
      word.translated = translated

      if(words.findIndex(word => word.word_id === word_id) === words.length - 1 || words.length === 1)
        _words.push({ original: '', translated: '', word_id: incrementLastWordId() })

      return _words
    })

  const handleDeleteWord = word_id => () =>
    setWords(words => {
      //nie usuwaj pustego pola na końcu
      if(words.findIndex(word => word.word_id === word_id) === words.length - 1)
        return words

      return words.filter(word => word.word_id !== word_id)
    })

  const history = useHistory()
  let [submitting, setSubmitting] = useState(false)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    const filteredWords = words
      .map(({ original, translated }) => ({ original, translated }))
      .filter(({ original, translated }) => original && translated)

    if(!name || !subject || filteredWords.length === 0)
      return

    setSubmitting(true)

    const { setId } = await createSet(name, subject, filteredWords)
    history.push(`/set/${setId}`)
    setSubmitting(false)
  }, [words, name, subject])

  const classes = useStyles({})


  const { id } = useParams()
  const editing = id !== undefined
  const [fetchedSet, setFetchedSet] = useState(false)

  useEffect(() => {
    if(!editing)
      return
    
    getSet(parseInt(id)).then(({ name, subject, words }) => {
      setName(name)
      setSubject(subject)
      setWords(
        words
          .map((word, index) => ({ ...word, word_id: index }))
          .concat([{ original: '', translated: '', word_id: words.length }])
      )
      setLastWordId(words.length + 1)
      setFetchedSet(true)
    })
  }, [id])

  console.log(words)

  if(editing && !fetchedSet)
    return <>
      <Header />
      <Main>
        <CircularProgress />
      </Main>
    </>

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>{editing ? 'Edytuj zestaw' : 'Stwórz zestaw'}</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.controls}>
              <TextField label="Nazwa zestawu" fullWidth inputProps={{ required: true, minLength: 3, maxLength: 50 }} onChange={({ target: { value }}) => setName(value)} value={name} />
              <TextField label="Kategoria" fullWidth inputProps={{ required: true, minLength: 3, maxLength: 20 }} onChange={({ target: { value }}) => setSubject(value)} value={subject} />
            </div>
            <Typography variant="h5" gutterBottom>Dodaj fiszki</Typography>
            <Grid container direction="column" className={classes.wordsContainer} spacing={1}>
              {words.map(({ original, translated, word_id }) => (
                <Grid item key={word_id} container alignItems="flex-end" className={classes.wordsRow}>
                  <Word original={original} translated={translated} onChange={handleChangeWord(word_id)} />
                  <Button variant="outlined" color="primary" onClick={handleDeleteWord(word_id)}>Usuń</Button>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" gutterBottom>
              Ilość fiszek w zestawie: { words.length - 1 }
            </Typography>
            <Button variant="contained" color="primary" disabled={submitting} type="submit" size="large">
              Zapisz zestaw
            </Button>
          </form>
        </Container>
      </Main>
    </>
  )
}