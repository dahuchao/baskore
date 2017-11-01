import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AccueilConteneur from "./accueil/accueil-conteneur.js"
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Switch>
        <Route path="/" component={AccueilConteneur}></Route>
      </Switch>
    </Router>
  </MuiThemeProvider>
)
export default App;
