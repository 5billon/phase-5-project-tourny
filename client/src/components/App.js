import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './NavBar'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Tournaments from './Tournaments'

export const Context = React.createContext()

function App() {

  const [signedIn, setSignedIn] = useState(false)
  const [user, setUser] = useState(null)
  const handleUser = (user) => setUser(user)

  useEffect(() => {
    fetch('/check_session').then((res)=> {
      if(res.ok){
        res.json().then((userObj) => setUser(userObj))
      }
    })
  }, [setUser])

  return (
    <Router>
      <div className="App-Div">
        <Context.Provider value={[signedIn, setSignedIn]}>
          <NavBar user={user} handleUser={handleUser}/>
          
        </Context.Provider>
        
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path="/login" component={()=> <Login handleUser={handleUser}/>}/>
          <Route path="/signup" component={()=> <Signup handleUser={handleUser}/>}/>
          <Route path='/tournaments' component={Tournaments}/>
        </Switch>
      </div>
    </Router>

  )
}

export default App;
