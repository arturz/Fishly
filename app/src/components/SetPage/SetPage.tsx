import { Button, Card, Container, Divider, FormControlLabel, Grid, List, ListItem, makeStyles, Switch, Theme, Typography } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import reportSet from '../../api/set/reportSet'
import toggleSavedSet from '../../api/set/saved/toggleSavedSet'
import Header from '../../components/Header'
import Main from '../../components/Main'
import WordCard from '../../components/SetPage/WordCard'
import { useStateValue } from '../../redux/state'
import Set from '../../types/Set'
import User from '../../types/User'
import Item from './Item'

const useStyles = makeStyles((theme: Theme) => ({
  wordCount: {
    color: theme.palette.text.secondary
  },
  leftPanel: {
    userSelect: 'none'
  },
  wordCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4, 0, 1)
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  },
  controls: {
    '& > *': { marginTop: theme.spacing(1) }
  }
}))

interface Props {
  set: Set
  id: string
  setSet: (set: Set) => void
}

export default ({ set, id, setSet }: Props) => {
  //name of localStorage keys
  const REVERSED_KEY = `${id}_reversed_mode`
  const SHOW_ONLY_STARRED_KEY = `${id}_only_starred_key`
  const STARS_LIST_KEY = `${id}_stars`
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

  const [reversedLanguage, setReversedLanguage] = useState(localStorage.getItem(REVERSED_KEY) === '1')
  const reverseLanguage = (state: boolean) => {
    setReversedLanguage(state)
    if(state){
      localStorage.setItem(REVERSED_KEY, '1')
      return
    }
    
    localStorage.removeItem(REVERSED_KEY)
  }

  const [showOnlyStarred, setShowOnlyStarred] = useState(localStorage.getItem(SHOW_ONLY_STARRED_KEY) === '1')
  const toggleOnlyStarred = (state: boolean) => {
    setShowOnlyStarred(state)

    //go to start of list (prevent bug when new list is shorter than old list)
    setCurrentWordIndex(0)
    
    if(state){
      localStorage.setItem(SHOW_ONLY_STARRED_KEY, '1')
      return
    }
    
    localStorage.removeItem(SHOW_ONLY_STARRED_KEY)
  }

  const classes = useStyles({})

  const nextWord = useCallback(() =>
    setCurrentWordIndex(currentWordIndex + 1)
  , [currentWordIndex])

  const previousWord = useCallback(() =>
    setCurrentWordIndex(currentWordIndex - 1)
  , [currentWordIndex])

  const handleKeyDown = useCallback(({ code, repeat }) => {
    if(repeat)
      return
  
    if(code === 'ArrowLeft' && currentWordIndex !== 0){
      previousWord()
      return
    }
  
    if(code === 'ArrowRight' && currentWordIndex !== set.words.length - 1){
      nextWord()
    }
  }, [currentWordIndex, set])

  useEffect(() => {  
    window.addEventListener('keydown', handleKeyDown)

    return () =>
      window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const [saveTransform, setSaveTransform] = useState(false)
  const toggleSavedState = async () => {
    setSaveTransform(true)
    const { toggled } = await toggleSavedSet(set.set_id)
    setSet({ ...set, saved: toggled })
    setSaveTransform(false)
  }

  const report = async () => {
    if(!confirm('Jesteś pewny, że chcesz zgłosić?'))
      return
    
    const { success } = await reportSet(set.set_id)
    const reported = Boolean(success)
    setSet({ ...set, reported })
    if(reported)
      alert('Wysłano zgłoszenie')
  }

  const filteredWords = showOnlyStarred
    ? set.words.filter(({ starred }) => starred)
    : set.words

  //current word
  const word = filteredWords[currentWordIndex]

  const toggleWordStar = (e: React.ChangeEvent<{}>, starCount: number | null) => {
    const starred = starCount === 1

    if(localStorage.getItem(STARS_LIST_KEY) === null)
      localStorage.setItem(STARS_LIST_KEY, '[]')

    if(starred){
      localStorage.setItem(STARS_LIST_KEY, 
        JSON.stringify(
          [...JSON.parse(localStorage.getItem(STARS_LIST_KEY) as string), word.word_id]
        )
      )
    } else {
      localStorage.setItem(STARS_LIST_KEY, 
        JSON.stringify(
          JSON.parse(localStorage.getItem(STARS_LIST_KEY) as string).filter((word_id: string) => word_id !== word.word_id)
        )
      )
    }

    const _set = {...set}
    _set.words[set.words.findIndex(({ word_id }) => word_id === word.word_id)].starred = starred
    setSet(_set)
  }

  //assign stars to words basing on localStorage
  useLayoutEffect(() => {
    if(set === null || localStorage.getItem(STARS_LIST_KEY) === null || 'starred' in set.words[0])
      return

    const stars = JSON.parse(localStorage.getItem(STARS_LIST_KEY) as string)

    setSet({ 
      ...set,
      words: set.words.map(({ word_id, ...word }) => ({
        ...word,
        word_id,
        starred: stars.includes(word_id)
      }))
    })
  }, [set])

  const [{ user }] = useStateValue()
  const logged = user !== null
  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={8}>
              <Grid container justify="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h5">{ set.name }</Typography>
                  <Typography variant="subtitle2">
                    <Link to={`/account/${set.user_id}`} className={classes.link}>{ set.login }</Link>
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" className={classes.wordCount}>{currentWordIndex+1}/{filteredWords.length}</Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.wordCardContainer}>
                {word ? 
                  <Grid item md={10} xs={12}>
                    <WordCard reversedLanguage={reversedLanguage} original={word.original} translated={word.translated} key={(reversedLanguage ? '1' : '0')+word.original+word.translated} />
                    <div className={classes.navigation}>
                      <Button variant="contained" color="primary" size="large" onClick={previousWord} disabled={currentWordIndex === 0}>
                        Poprzednia
                      </Button>
                      <Rating value={word.starred ? 1 : 0} max={1} size="large" onChange={toggleWordStar} />
                      <Button variant="contained" color="primary" size="large" onClick={nextWord} disabled={currentWordIndex === filteredWords.length - 1}>
                        Następna
                      </Button>
                    </div>
                  </Grid>
                  : <Typography variant="h5">Brak słów spełniających kryteria</Typography>}
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.leftPanel}>
              <Card>
                <List>
                  <ListItem>
                    <FormControlLabel
                      control={
                        <Switch checked={showOnlyStarred} onChange={({ target: { checked } }) => toggleOnlyStarred(checked)} color="secondary" />
                      }
                      label="Tylko ogwiazdkowane"
                    />
                  </ListItem>
                  <ListItem>
                    <FormControlLabel
                      control={
                        <Switch checked={reversedLanguage} onChange={({ target: { checked } }) => reverseLanguage(checked)} color="secondary" />
                      }
                      label="Zamień języki"
                    />
                  </ListItem>
                  <Divider />
                  <ListItem>
                    <Typography variant="h6">
                      Fiszki w zestawie
                    </Typography>
                  </ListItem>
                  {filteredWords.map((word, index) =>
                    <Item onClick={() => setCurrentWordIndex(index)} selected={index === currentWordIndex} reversedLanguage={reversedLanguage} key={index} {...word} />
                  )}
                  <Divider />
                  <ListItem>
                    <Grid container justify="space-between" className={classes.controls}>
                      {logged
                        ? <>
                            {set.saved
                              ? <Button variant="outlined" onClick={toggleSavedState} size="small" color="primary" disabled={saveTransform}>Usuń z zapisanych</Button> 
                              : <Button variant="contained" onClick={toggleSavedState} size="small" color="primary" disabled={saveTransform}>Zapisz zestaw</Button>}
                            {set.user_id === (user as User).userId
                              ? <Link to={`/createset/${set.set_id}`} className={classes.link}>
                                  <Button variant="contained" size="small" color="primary">Edytuj</Button>
                                </Link>
                              : (set.reported || <Button variant="outlined" size="small" color="secondary" onClick={report}>Zgłoś</Button>)}
                          </>
                        : <> 
                            <Link to="/login" className={classes.link}>
                              <Button variant="contained" size="small" color="primary">Zapisz</Button>
                            </Link>
                            <Link to="/login" className={classes.link}>
                              <Button variant="outlined" size="small" color="secondary">Zgłoś</Button>
                            </Link>
                          </>}
                    </Grid>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </>
  )
}