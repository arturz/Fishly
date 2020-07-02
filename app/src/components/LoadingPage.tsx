import { CircularProgress } from '@material-ui/core'
import React from 'react'
import Header from './Header'
import Main from './Main'

export default () => (
  <>
    <Header />
    <Main>
      <CircularProgress />
    </Main>
  </>
)