import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {Link} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Store from './services/Store';

class App extends Component {
  handleLogout = (e)=>{
    //e.preventDefault();
    Store.deauthenticate();
    }
  render() {
    var loginLink=(
        <li className="nav-item"><Link to="/login" onClick={this.handleLogout}>{Store.isAuthenticated() ? "Logout" : "Login"}</Link></li>
    );
    // if(Store.isAuthenticated()){
    //   loginLink=(
    //     <li className="nav-item"><a onClick={this.handleLogout}>Logout</a></li>
    //   )
    // }
    return (
      <MuiThemeProvider>

      <div className="App">

        <div className="App-header">
          <div><img src={logo} className="App-logo" alt="logo" /></div>

          <ul className="navbar">
            <li className="nav-item"><Link to="/">Users</Link></li>
            
            {loginLink}
          </ul>
        </div>
            {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
