import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AccueilConteneur from "./accueil/accueil-conteneur.js"
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Switch>
        <Redirect from="/" exact to="/rencontres"/>
        <Route path="/" component={AccueilConteneur}></Route>
      </Switch>
    </Router>
  </MuiThemeProvider>
)
export default App;
