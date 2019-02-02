import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <Routes />
        <footer>
  				<img src="img/white-logo.svg" alt="Logo branca dos Minions"/>
  				<p>Copyright © Loja dos Minions 2019</p>
  			</footer>
      </div>
    );
  }
}

export default App;
