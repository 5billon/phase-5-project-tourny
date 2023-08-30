import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './NavBar'
import Login from './Login'
import Signup from './Signup'
import Home from './Home'
import Tournaments from './Tournaments'
import CreateTournament from './CreateTournament'
import TournamentPage from "./TournamentPage";
import UserProfile from './UserProfile'
import { PictureProvider } from "./PictureContext";

function App() {
  const [user, setUser] = useState(null)
  const handleUser = (user) => setUser(user)

  useEffect(() => {
    fetch('/check_session').then((res) => {
      if (res.ok) {
        res.json().then((userObj) => setUser(userObj))
      }
    })
  }, [setUser])

  return (
    <Router>
      <div className="App-Div">
        <PictureProvider>
          <NavBar user={user} handleUser={handleUser} />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/login" component={() => <Login handleUser={handleUser} />} />
            <Route path="/signup" component={() => <Signup handleUser={handleUser} />} />
            <Route path='/tournaments' component={Tournaments} />
            <Route path='/createtournament' component={() => <CreateTournament user={user} />} />
            <Route path='/tournament/:id' component={TournamentPage} />
            <Route path='/userprofile/:id' component={(props) => <UserProfile {...props} user={user} setUser={setUser} />} />
          </Switch>
        </PictureProvider>
      </div>
    </Router>

  )
}

export default App;
