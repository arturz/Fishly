import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getSet from '../../api/set/getSet';
import Set from '../../types/Set';
import LoadingPage from '../LoadingPage';
import SetPage from './SetPage';

function shuffle(a: any[]) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Params {
  id: string
}

export default () => {
  const [set, setSet] = useState<Set | null>(null)
  const { id } = useParams<Params>()

  useEffect(() => {
    if(!id)
      return
    
    getSet(parseInt(id)).then(fetchedSet => {
      setSet({
        ...fetchedSet,
        words: shuffle(fetchedSet.words),
      })
    })
  }, [id])

  if(set === null)
    return <LoadingPage />

  return <SetPage id={id} set={set} setSet={setSet} />
}