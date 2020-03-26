import React, { useState, useEffect, useCallback } from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import { makeStyles, Container, Typography, Grid, CircularProgress, Card, List, ListItem, CardContent, CardActions, Button, Divider, Theme } from '@material-ui/core'
import { useParams, Link } from 'react-router-dom'
import WordCard from '../components/WordCard'
import sets from '../mocks/sets'
import getSet from '../api/set/getSet'
import toggleSavedSet from '../api/set/saved/toggleSavedSet'

const useStyles = makeStyles((theme: Theme) => ({
  leftPanel: {
    userSelect: 'none'
  },
  wordCardContainer: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(4, 0, 1)
  },
  controls: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main
  }
}))

enum SavedStatus { Unknown, Unsaved, Changing, Saved }

export default () => {
  const [set, setSet] = useState(null)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const { id } = useParams()

  const classes = useStyles({})

  useEffect(() => {
    if(!id)
      return
    
    getSet(parseInt(id)).then(setSet)
  }, [id])

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
    setSet({
      ...set,
      saved: toggled
    })
    setSaveTransform(false)
  }

  if(set === null)
    return (
      <>
        <Header />
        <Main>
          <CircularProgress />
        </Main>
      </>
    )

  const word = set.words[currentWordIndex]

  return (
    <>
      <Header />
      <Main>
        <Container maxWidth="md">
          <Grid container spacing={3} direction="row-reverse">
            <Grid item xs={12} md={8}>
              <Grid container justify="space-between" alignItems="flex-end">
                <Grid item>
                  <Typography variant="h5">
                  {
                    set.name
                  }
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body2">
                    Autor: <Link to={`/account/${set.login}`} className={classes.link}>{ set.login }</Link>
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.wordCardContainer}>
                <Grid item md={10} xs={12}>
                  <WordCard 
                    original={word.original}
                    translated={word.translated}
                    key={word.original+word.translated}
                  />
                  <div className={classes.controls}>
                    <Button variant="contained" color="primary" onClick={previousWord} disabled={currentWordIndex === 0}>
                      Poprzednia
                    </Button>
                    <Button variant="contained" color="primary" onClick={nextWord} disabled={currentWordIndex === set.words.length - 1}>
                      Następna
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4} className={classes.leftPanel}>
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6" gutterBottom>
                      Fiszki w zestawie
                    </Typography>
                  </ListItem>
                  <Divider />
                  {
                    set.words.map(({ original }, index) =>
                      <ListItem button onClick={() => setCurrentWordIndex(index)} selected={index === currentWordIndex} key={index}>
                      { 
                        original
                      }
                      </ListItem>
                    )
                  }
                  <ListItem>
                    <Grid container justify="space-between">
                      {
                        set.saved ? (
                          <Button variant="outlined" onClick={toggleSavedState} size="small" disabled={saveTransform}>
                            Usuń z zapisanych
                          </Button> 
                        ) : (
                          <Button variant="outlined" onClick={toggleSavedState} size="small" disabled={saveTransform}>
                            Zapisz
                          </Button> 
                        )
                      }
                      <Button variant="outlined" size="small">
                        Zgłoś
                      </Button>
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