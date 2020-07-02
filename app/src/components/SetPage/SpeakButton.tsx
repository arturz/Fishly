import { IconButton } from '@material-ui/core'
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver'
import React, { useCallback, useState } from 'react'
import { Language } from '../../types/Language'

export default ({ word, language = 'en', className }: { word: string, language: Language, className?: string }) => {
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
