import React, { useState, useEffect, useCallback } from 'react'
import { TextField } from '@material-ui/core'
import throttle from 'lodash.throttle'

export default ({ 
  original: initialOriginal = '', 
  translated: initialTranslated = '',
  onChange,
}) => {
  const [original, setOriginal] = useState(initialOriginal)
  const [translated, setTranslated] = useState(initialTranslated)

  const throttledChange = useCallback(throttle(onChange, 500, { leading: true }), [])

  const updateOriginal = ({ target: { value: original } }) => {
    setOriginal(original)
    throttledChange({ original, translated })
  }

  const updateTranslated = ({ target: { value: translated } }) => {
    setTranslated(translated)
    throttledChange({ original, translated })
  }

  return <>
    <TextField label="Słowo w obcym języku" value={original} onChange={updateOriginal} />
    <TextField label="Przetłumaczone słowo" value={translated} onChange={updateTranslated} />
  </>
} 