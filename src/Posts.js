import './css/Posts.css';
import React, {Component} from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import ImageUpload from './helperComponents/ImageUpload';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Avatar from 'material-ui/Avatar';
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';
import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';
class Post extends Component{
  handleDelete = ()=>{
    this.props.deletePost(this.props.post);
  }
render(){
  var post = this.props.post;
  return(
    <Card className="post">
      <Link to={"posts/"+post.id}>
        <CardHeader
         title={post.title}
         subtitle={post.user.fullname}
         avatar={<Avatar src={post.user.avatar_thumb} />} />
         { post.image_processing ? <CardMedia overlay={<CardTitle title="Imagine a rating here"/>}>
           <img src={post.image_medium} alt="" />
         </CardMedia>
        : <div>Image is processing</div>
          }
      </Link>
       <CardText className="post-icon-container">
         <a href={post.image_original}><FontIcon className="material-icons" >file_download</FontIcon></a>
         <BasicDeleteDialogButton delete={this.handleDelete} itemTitle={post.title} iconClass={"delete-post"}/>
       </CardText>
    </Card>
  )
}
}

class AddPost extends Component{
  state={
    open:false,
    title:"",
    description:"",
    imageLocation:"",
    ingredients:"",
    preparation:""
  }
  handleChange=(e)=>{
      var key=e.target.name;
      var obj = {};
      obj[key] = e.target.value;
      this.setState(obj);
  }
  handleLocationChange = (location)=>{
    this.setState({imageLocation:location});
  }
  handleManualLocationChange = (e)=>{
    e.preventDefault();
    this.setState({imageLocation:e.target.value})
  }
  handleOpenToggle = ()=>{
    if(this.state.open){
      this.setState({open:false});
    }else{
      this.setState({open:true});
    }
  }
  handleSubmit=()=>{
    var state=this.state;
    var newPost={
      title:state.title,
      description:state.description,
      image_temp_url:state.imageLocation,
      ingredients:state.ingredients,
      preparation:state.preparation
    };
    this.props.onSubmit(newPost);
    this.setState({
      open:false,
      title:"",
      description:"",
      imageLocation:"",
      ingredients:"",
      preparation:""
    });
  }
render(){
  if(!this.state.open){
    return (
      <FloatingActionButton onClick={this.handleOpenToggle}><ContentAdd/></FloatingActionButton>
    );
  }
  return(
    <div className="add-post-container">
      <FloatingActionButton onClick={this.handleOpenToggle}><ContentRemove/></FloatingActionButton>
      <div className="add-post">
        <TextField
          name="title"
           floatingLabelText="title"
           type="text" fullWidth={true}
           value={this.state.title}
           onChange={this.handleChange}/>
        <ImageUpload autoUpload={true} onUpload={this.handleLocationChange}/>
        <input type="text" disabled={false} placeholder="Image location" value={this.state.imageLocation} onChange={this.handleManualLocationChange} className="url-shower"/>
        <br/>
        <TextField
          name="description"
          floatingLabelText="description"
          type="text"
          multiLine={true}
          fullWidth={true}
          value={this.state.description}
          onChange={this.handleChange}/>
        <TextField
          name="ingredients"
          floatingLabelText="ingredients"
          type="text"
          multiLine={true}
          fullWidth={true}
          value={this.state.ingredients}
          onChange={this.handleChange}/>
        <TextField
          name="preparation"
          floatingLabelText="preparation"
          type="text"
          multiLine={true}
          fullWidth={true}
          value={this.state.preparation}
          onChange={this.handleChange}/>
        <FlatButton onClick={this.handleSubmit}>Post!</FlatButton>
      </div>
    </div>
  );
}
}


class Posts extends AuthComponent{
  state={
    posts:[]
  }
  addPost = (newPost)=>{
    this.post("posts",newPost,()=>{
      this.getPosts();
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
  deletePost = (post)=>{
    this.delete("posts/"+post.id,()=>{
      this.getPosts();
    });
  }
  getPosts=()=>{
    this.find("posts",(posts)=>{
      this.setState({posts:posts});

    });
  }
  componentDidMount(){
    this.getPosts();
  }
render(){

var postItems=this.state.posts.map((post)=>{
return(  <Post post={post} key={post.id} deletePost={this.deletePost}/>);
});
return(
  <div className="posts">
    <h4>Posts</h4>
    <AddPost onSubmit={this.addPost}/>
    {postItems}
  </div>
)
}
}
export default Posts;
