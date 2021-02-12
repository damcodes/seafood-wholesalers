import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LoginSignup from './containers/LoginSignup'
import Home from './containers/Home'
import About from './containers/About'
import Profile from './containers/Profile'
import Orders from './containers/Orders'
import NavBar from './components/NavBar'
import Logout from './containers/Logout'
import NewOrder from './containers/NewOrder'

function App() {

  const [ loggedIn, setLoggedIn ] = useState(false)

  return (
    <div className="App">
      <img src="https://www.seafoodwholesalers.com/image/131551250.png" alt="seafood logo" />
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/login' component={() => <LoginSignup />} />
          <Route exact path='/logout' component={() => <Logout />} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/orders' component={Orders} />
          <Route exact path='/new-order' component={NewOrder} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
