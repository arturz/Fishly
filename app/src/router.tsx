import React from 'react'
import { BrowserRouter, HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import Account from './pages/Account'
import Admin from './pages/Admin'
import CreateSet from './pages/CreateSet'
import IndexLogged from './pages/IndexLogged'
import IndexNotLogged from './pages/IndexNotLogged'
import Login from './pages/Login'
import Register from './pages/Register'
import Set from './pages/Set'
import { useStateValue } from './redux/state'

//check for localhost
const Router = ['localhost','127.0.0.1','[::1]',''].includes(location.hostname)
  ? ({ children }: { children: React.ReactNode }) => <HashRouter>{children}</HashRouter>
  : ({ children }: { children: React.ReactNode }) => <BrowserRouter>{children}</BrowserRouter>

export default () => {
  const [{ user }] = useStateValue()
  
  return (
    <Router>
    {
      user ? (
        <Switch>
          <Route exact path="/">
            <IndexLogged />
          </Route>
          <Route path="/set/:id">
            <Set />
          </Route>
          <Route path="/createset/:id">
            <CreateSet />
          </Route>
          <Route path="/createset">
            <CreateSet />
          </Route>
          <Route path="/account/:userId">
            <Account />
          </Route>
          {
            (user.status === 2 || user.status === 3) && (
              <Route path="/admin">
                <Admin />
              </Route>
            )
          }
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <IndexNotLogged />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/set/:id">
            <Set />
          </Route>
          <Route path="/account/:userId">
            <Account />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      )
    }
    </Router>
  )
}