import React, { useState, useCallback, useRef } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { Container, Theme, Typography, Grid, makeStyles, Card, List, ListItem, CardContent, CardActions, Button, TextField, Divider, IconButton, InputBase, Paper, FormControl, InputLabel, Select } from '@material-ui/core'
import createSet from '../api/set/createSet'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginBottom: theme.spacing(4),
    '& > *': {
      marginRight: theme.spacing(1)
    }
  },
  wordsContainer: {
    marginBottom: theme.spacing(4)
  },
  wordsRow: {
    '& > *': {
      marginRight: theme.spacing(1)
    }
  }
}))

export default () => {
  let wordsId = useRef(0)
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [words, setWords] = useState([{ original: '', translated: '', __id: ++wordsId.current }])

  const handleChangeOriginalWord = index => ({ target: { value } }) => {
    const newWords = [...words]
    const word = newWords[index]
    word.original = value

    if(index === newWords.length - 1 && word.translated !== ''){
      newWords.push({ original: '', translated: '', __id: +wordsId.current })
    }

    setWords(newWords)
  }

  const handleChangeTranslatedWord = index => ({ target: { value } }) => {
    const newWords = [...words]
    const word = newWords[index]
    word.translated = value

    if(index === newWords.length - 1 && word.original !== ''){
      newWords.push({ original: '', translated: '', __id: +wordsId.current })
    }

    setWords(newWords)
  }

  const handleDeleteWord = index => () => {
    const newWords = words.filter((word, wordIndex) => wordIndex !== index)
    if(newWords.length === 0)
      return

    setWords(newWords)
  }


  const history = useHistory()
  let [submitting, setSubmitting] = useState(false)
  const handleSubmit = async (e) => {
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
  }

  const classes = useStyles({})
  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>Stwórz zestaw</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.controls}>
              <TextField label="Nazwa zestawu" inputProps={{ required: true, minLength: 3, maxLength: 50 }} onChange={({ target: { value }}) => setName(value)} />
              <TextField label="Kategoria" inputProps={{ required: true, minLength: 3, maxLength: 20 }} onChange={({ target: { value }}) => setSubject(value)} />
            </div>
            <Typography variant="h5" gutterBottom>Dodaj fiszki</Typography>
            <Grid container direction="column" className={classes.wordsContainer} spacing={1}>
            {
              words.map(({ original, translated, __id }, index) => (
                <Grid item key={__id} container alignItems="flex-end" className={classes.wordsRow}>
                  <TextField label="Słowo" value={original} onChange={handleChangeOriginalWord(index)} />
                  <TextField label="Przetłumaczone słowo" value={translated} onChange={handleChangeTranslatedWord(index)} />
                  <Button variant="outlined" color="primary" onClick={handleDeleteWord(index)}>Usuń</Button>
                </Grid>
              ))
            }
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