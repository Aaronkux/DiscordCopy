import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { hot } from 'react-hot-loader/root'
// import WebSocket from '../WebSocket'
import Login from '../Login'
import Register from '../Register'
import App from '../App'
import NotFind from '../../components/NotFind'
import Index from '../../components/Index'
import { RootState } from '../../redux/configStore'

function Layout() {
  const isValid = useSelector((state: RootState) => state.user.isValid)
  return (
    <React.Fragment>
      <Switch>
        <Route path='/' exact component={Index}></Route>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        {isValid ?
          <Route path='/app' component={App} /> :
          <Route path='/app' render={() => <Redirect to={{ pathname: '/login' }} />} />
        }
        <Route path='*' component={NotFind} />
      </Switch>
    </React.Fragment>
    // <WebSocket guildId={1} />
  )
}

// export default React.memo(Layout)
export default process.env.NODE_ENV === "development" ? hot(React.memo(Layout)) : React.memo(Layout)