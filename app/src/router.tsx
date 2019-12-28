import React from 'react'
import { HashRouter, BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useStateValue } from './state'
import IndexLogged from './pages/IndexLogged'
import IndexNotLogged from './pages/IndexNotLogged'
import Set from './pages/Set'
import CreateSet from './pages/CreateSet'
import Account from './pages/Account'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import MyAccount from './pages/MyAccount'

//check for localhost
const Router = ['localhost','127.0.0.1','[::1]',''].includes(location.hostname)
  ? props => <HashRouter {...props} />
  : props => <BrowserRouter {...props} />

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
          <Route path="/createset">
            <CreateSet />
          </Route>
          <Route path="/account/:login">
            <Account />
          </Route>
          <Route path="/account">
            <MyAccount />
          </Route>

          { /* test */ }
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>

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
          <Route path="/account/:login">
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