import React from 'react'
import { render }  from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import Home from './components/home/home'
import Login from './components/login/login'
import 'Css/index.css'
import store from './store/store'
import Action from './action/action'

class App extends React.Component {
  constructor() {
    super()
  }

  componentDidMount() {
    // init & update global width/height
    // let setSize = () => Action.setSize(document.body.offsetWidth, document.body.offsetHeight)
    // store.dispatch(setSize())
    // window.onresize = function() { store.dispatch(setSize())}
    // update global scroll
    // window.onscroll = () => {
    //   let scrollTop = document.body.scrollTop || document.documentElement.scrollTop
    //   store.dispatch(Action.setScroll(scrollTop))
    // }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route path='/home' component={Home}/>
        </Switch>
      </div>
    )
  }
}

render((
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
), document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}