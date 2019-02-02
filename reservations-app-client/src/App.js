import React, { Component, Fragment } from "react";
import './App.css';
import Routes from "./Routes";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { Auth } from "aws-amplify";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };
    return (
        !this.state.isAuthenticating &&
        <div className="App">
        {this.state.isAuthenticated
            ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
            : <Fragment>
                  <NavItem href="/signup">Signup</NavItem>
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


export default withRouter(App);
