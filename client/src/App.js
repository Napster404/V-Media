import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

import Login from './Components/Login/Login'
import Main from './Main'

function App() {  
  return (
    <div className="app">
      <Router>
        <Switch>

          <Route exact path="/login">
            <Login />
          </Route>

          <Route path="/">
            <Main />
          </Route>

        </Switch>
      </Router>
    </div >
  );
}

export default App;
