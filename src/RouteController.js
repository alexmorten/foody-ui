import React,{Component} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Login from './Login';
import App from './App';
import Registrate from './Registrate';
import Users from './Users';

class RouteController extends Component{
render(){
  return(
    <Router >
      <Route path="/" >
        <App>
        <Switch>

          <Route path="/register" component={Registrate}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/" component={Users}></Route>
        </Switch>
        </App>
      </Route>
    </Router>
  );
}
}
export default RouteController;
