import React, { useState, useEffect, useCallback } from 'react'
import { makeStyles, Typography, Card, Theme } from '@material-ui/core'
import SpeakButton from './SpeakButton'

const useStyles = makeStyles((theme: Theme) => ({
  scene: {
    width: '100%',
    height: theme.spacing(30),
    perspective: theme.spacing(65)
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
    userSelect: 'none',
    transition: theme.transitions.create(
      ['transform'],
      { duration: theme.transitions.duration.standard }
    ),
    transformStyle: 'preserve-3d',
    transform: ({ flipped }: { flipped: boolean }) => flipped
      ? 'rotateX(0deg)'
      : 'rotateX(-180deg)'      
  },
  cardFace: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    padding: theme.spacing(1),
  },
  cardFaceBack: {
    transform: 'rotateX(-180deg)'
  },
  speakButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    zIndex: 1
  }
}))

export default ({ original, translated, reversedLanguage }: { original: string, translated: string, reversedLanguage: boolean }) => {
  const [flipped, setFlipped] = useState(reversedLanguage)
  const classes = useStyles({ flipped })

  const handleKeyDown = useCallback(({ code, repeat }) =>
    !repeat && (code === 'ArrowUp' || code === 'ArrowDown') && setFlipped(flipped => !flipped)
  , [flipped])

  useEffect(() => {  
    window.addEventListener('keydown', handleKeyDown)

    return () =>
      window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
 
  return (
    <div className={classes.scene} onPointerDown={() => setFlipped(flipped => !flipped)}>
      <div className={`${classes.card} ${flipped ? 'flipped' : ''}`}>
        <Card className={`${classes.cardFace} ${classes.cardFaceBack}`}>
          <Typography variant="h4">
          {
            translated
          }
          </Typography>
        </Card>
        <Card className={classes.cardFace}>
          <Typography variant="h4">
          {
            original
          }
          </Typography>
        </Card>
        <SpeakButton word={original} className={classes.speakButton} language="en" />
      </div>
    </div>
  )
}