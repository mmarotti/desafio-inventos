import React, { Component, Fragment } from "react";
import './App.css';
import Routes from "./Routes";
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    this.userHasAuthenticated(false);
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
        <div className="App container">
        {this.state.isAuthenticated
            ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
            : <Fragment>
                  <NavItem href="/logout">Signup</NavItem>
                  <NavItem href="/login">Login</NavItem>
              </Fragment>
          }

        <Routes childProps={childProps} />
        <footer>
  				<img src="img/white-logo.svg" alt="Logo branca dos Minions"/>
  				<p>Copyright © Loja dos Minions 2019</p>
  			</footer>
      </div>
    );
  }
}


export default App;
