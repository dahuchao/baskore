import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AccueilConteneur from "./accueil/accueil-conteneur.js"
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <Route path="/" component={AccueilConteneur}></Route>
    </Router>
  </MuiThemeProvider>
)
export default App;
