import React, { useCallback, useState } from 'react'
import { IconButton } from '@material-ui/core'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'

export default ({ word, language, className }: { word: string, language: string, className?: string }) => {
  const [disabled, setDisabled] = useState(false)

  const speak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(word)
    utterance.lang = language
    utterance.addEventListener('start', () => setDisabled(true))
    utterance.addEventListener('end', () => setDisabled(false))
    speechSynthesis.speak(utterance)
  }, [word, language])

  return (
    <IconButton disabled={disabled} className={className || ''} onClick={speak} onPointerDown={event => event.stopPropagation()}>
      <RecordVoiceOverIcon />
    </IconButton>
  )
}