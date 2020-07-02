import { TextField } from '@material-ui/core'
import throttle from 'lodash.throttle'
import React, { useCallback, useState } from 'react'
import LanguagesPair from '../../types/LanguagesPair'

export default ({ 
  original: initialOriginal = '', 
  translated: initialTranslated = '',
  onChange,
}: {
  original: string
  translated: string
  onChange: ({ original, translated }: LanguagesPair) => void
}) => {
  const [original, setOriginal] = useState(initialOriginal)
  const [translated, setTranslated] = useState(initialTranslated)

  const throttledChange = useCallback(throttle(onChange, 500, { leading: true }), [])

  const updateOriginal = ({ target: { value: original } }: React.ChangeEvent<HTMLInputElement>) => {
    setOriginal(original)
    throttledChange({ original, translated })
  }

  const updateTranslated = ({ target: { value: translated } }: React.ChangeEvent<HTMLInputElement>) => {
    setTranslated(translated)
    throttledChange({ original, translated })
  }

  return <>
    <TextField label="Słowo w obcym języku" value={original} onChange={updateOriginal} />
    <TextField label="Przetłumaczone słowo" value={translated} onChange={updateTranslated} />
  </>
} 