import React from 'react';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import AccueilConteneur from "./accueil/accueil-conteneur.js"
import './App.css';

const App = () => (
  <MuiThemeProvider>
    <Router>
      <div>
        <Route path="/" component={AccueilConteneur}></Route>
        {/* <Redirect from="/" exact to="/rencontres"/> */}
      </div>
    </Router>
  </MuiThemeProvider>
)
export default App;
