import './css/Users.css';
import React, {Component} from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import ImageUpload from './ImageUpload';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
class User extends Component{
render(){
  var user = this.props.user;
  return(
    // <div className="user">
    //   <img src={user.avatar_thumb} alt=""/>
    //   <p>{user.fullname}</p>
    //   <ImageUpload refresh={this.props.refresh} user={user}/>
    // </div>
    <ListItem
      disabled={true}
      leftAvatar={<Avatar src={user.avatar_original} />}
      rightIcon={ <ImageUpload refresh={this.props.refresh} user={user}/>}>
        {user.fullname}
      
      </ListItem>
  )
}
}

class Users extends AuthComponent {
  state={
    users:[]
  }
  getUsers = () =>{
    this.find("users/",(users)=>{
      console.log(users);
      this.setState({users:users});
    });
  }
  componentDidMount(){
    this.getUsers();
  }
  render(){
    var userItems=this.state.users.map((user)=>{
      return(<User user={user} key={user.id} refresh={this.getUsers}/>);
    });
    return(
      <List className="users">
        {userItems}
      </List>
    )
  }

}
export default Users;
