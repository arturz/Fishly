import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'
import Index from './routes/index'
import Home from './routes/home'
import Login from './routes/login'
import Account from './routes/account'
import Layout from './components/Layout'

export default () => (
  <>
    <CssBaseline />
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Index />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/account">
            <Account />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </>
)