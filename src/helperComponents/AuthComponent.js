import {Component} from 'react';
import Store from '../services/Store';
class AuthComponent extends Component{
  transitionToLogin(){

    this.props.history.push("/login");
    this.props.history.goForward();
  }
  find(url,cb,fail){

    if(Store.receive(url,cb,fail)==="login"){
      this.transitionToLogin();
    }
  }
  query(url,paramsObj,cb,fail){
    if(Store.query(url,paramsObj,cb,fail)==="login"){
      this.transitionToLogin();
    }
  }
  post(url,obj,cb,fail){
    if(Store.send(url,obj,cb,fail)==="login"){
      this.transitionToLogin();
    }
  }
  update(url,obj,cb,fail){
    if(Store.update(url,obj,cb,fail)==="login"){
      this.transitionToLogin();
    }
  }
  
  delete(url,cb,fail){
    if(Store.destroy(url,cb,fail)==="login"){
      this.transitionToLogin();
    }
  }
}
export default AuthComponent;
