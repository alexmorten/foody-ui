import './css/Posts.css';
import React,{Component} from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import ImageUpload from './helperComponents/ImageUpload';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import Post from './Post';

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
return(  <Post post={post} key={post.id} deletePost={this.deletePost} link={true} refresh={this.getPosts}/>);
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
