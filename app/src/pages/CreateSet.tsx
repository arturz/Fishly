import { Button, CircularProgress, Container, Grid, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import createSet from '../api/set/createSet'
import deleteSet from '../api/set/deleteSet'
import editSet from '../api/set/editSet'
import getSet from '../api/set/getSet'
import Word from '../components/CreateSetPage/Word'
import Header from '../components/Header'
import Main from '../components/Main'
import LanguagesPair from '../types/LanguagesPair'

const useStyles = makeStyles((theme: Theme) => ({
  controls: {
    marginBottom: theme.spacing(2),
    '& > *': {
      marginBottom: theme.spacing(1)
    },
    maxWidth: '400px'
  },
  gutterBottom: {
    marginBottom: theme.spacing(2)
  },
  wordsRow: {
    '& > *': {
      marginRight: theme.spacing(1)
    }
  },
}))

interface NewWord {
  original: string
  translated: string
  index: number
  word_id?: string //updating current set
}

interface Params {
  id: string
}

export default () => {
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')

  const [lastWordIndex, setLastWordIndex] = useState(0)
  const incrementLastWordIndex = () => {
    setLastWordIndex(lastWordIndex => lastWordIndex + 1)
    return lastWordIndex + 1
  }

  const [words, setWords] = useState<NewWord[]>([{ original: '', translated: '', index: lastWordIndex }])

  const handleChangeWord = (index: number) => ({ original, translated }: LanguagesPair) =>
    setWords(words => {
      const _words = [...words]
      const word = _words.find((word) => word.index === index)
      //word could already be deleted
      if(word === undefined)
        return words

      word.original = original
      word.translated = translated

      if(words.findIndex(word => word.index === index) === words.length - 1 || words.length === 1)
        _words.push({ original: '', translated: '', index: incrementLastWordIndex() })

      return _words
    })

  const handleDeleteWord = (index: number) => () =>
    setWords(words => {
      //do not remove blank fields row at the bottom
      if(words.findIndex(word => word.index === index) === words.length - 1)
        return words

      return words.filter(word => word.index !== index)
    })

  const { id } = useParams<Params>()
  const editing = id !== undefined
  const [fetchedSet, setFetchedSet] = useState(false)

  useEffect(() => {
    if(!editing)
      return
    
    getSet(parseInt(id)).then(({ name, subject = '', words }) => {
      setName(name)
      setSubject(subject)
      setWords([
        ...words.map((word, index) => ({ ...word, index })),
        { original: '', translated: '', index: words.length }
      ])
      setLastWordIndex(words.length + 1)
      setFetchedSet(true)
    })
  }, [id])

  const history = useHistory()
  let [submitting, setSubmitting] = useState(false)
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    const filteredWords = words
      .map(({ original, translated, word_id }) => ({ original, translated, word_id }))
      .filter(({ original, translated }) => original && translated)

    if(!name || !subject || filteredWords.length === 0)
      return

    setSubmitting(true)

    const { setId } = editing
      ? await editSet(+id, name, subject, filteredWords)
      : await createSet(name, subject, filteredWords)
    history.push(`/set/${setId}`)
    setSubmitting(false)
  }, [words, name, subject])

  const classes = useStyles({})

  const delSet = async () => {
    if(!confirm('Na pewno chcesz usunąć?'))
      return

    const { success } = await deleteSet(+id)
    if(success)
      history.replace(`/`)
    else 
      alert('Błąd')
  }

  const formRef = useRef<HTMLFormElement>(null)
  useEffect(() => {
    formRef.current?.scrollIntoView({ block: 'end' })
  }, [words.length])

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
          <form noValidate autoComplete="off" onSubmit={handleSubmit} ref={formRef}>
            <div className={classes.controls}>
              <TextField label="Nazwa zestawu" fullWidth inputProps={{ required: true, minLength: 3, maxLength: 50 }} onChange={({ target: { value }}) => setName(value)} value={name} />
              <TextField label="Kategoria" fullWidth inputProps={{ required: true, minLength: 3, maxLength: 20 }} onChange={({ target: { value }}) => setSubject(value)} value={subject} />
            </div>
            <Typography variant="h5" gutterBottom>Dodaj fiszki</Typography>
            <Grid container direction="column" className={classes.gutterBottom} spacing={1}>
              {words.map(({ original, translated, index }) => (
                <Grid item key={index} container alignItems="flex-end" className={classes.wordsRow}>
                  <Word original={original} translated={translated} onChange={handleChangeWord(index)} />
                  <Button variant="outlined" color="primary" onClick={handleDeleteWord(index)}>Usuń</Button>
                </Grid>
              ))}
            </Grid>
            <Typography variant="body1" gutterBottom>
              Ilość fiszek w zestawie: { words.length - 1 }
            </Typography>
            <Button variant="contained" color="primary" disabled={submitting} type="submit" size="large" className={classes.gutterBottom}>
              Zapisz zestaw
            </Button>
            <br />
            {editing && <Button variant="outlined" color="secondary" disabled={submitting} onClick={delSet}>Usuń zestaw</Button>}
          </form>
        </Container>
      </Main>
    </>
  )
}