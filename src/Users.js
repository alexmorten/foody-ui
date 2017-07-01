import './css/Users.css';
import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import ImageUpload from './helperComponents/ImageUpload';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
class User extends AuthComponent{
  handleAvatarChange= (location)=>{
    this.update("users/"+this.props.user.id,{image:location},(response)=>{
      this.props.refresh();
    });
  }
render(){
  var user = this.props.user;
  return(
    <ListItem
      disabled={true}
      leftAvatar={<Avatar src={user.avatar_thumb} />}
      rightIcon={ <ImageUpload refresh={this.props.refresh} user={user} onUpload={this.handleAvatarChange}/>}>
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
