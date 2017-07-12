import './css/DetailedPost.css';
import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Link} from 'react-router-dom';
import Comment from './Comment';
import CommentForm from './helperComponents/CommentForm';
import Post from './Post';
class DetailedPost extends AuthComponent{
state={
  post:null,
  comments:[]
}
getPost = ()=>{

  var post_id = this.props.match.params.post_id;
  this.find("posts/"+post_id,(post)=>{
    this.setState({post:post});
    this.find("posts/"+post_id+"/comments",(comments)=>{
        this.setState({comments:comments});
        console.log(comments);
    },(failResponse)=>{console.log(failResponse)});
  },(failResponse)=>{console.log(failResponse);});
}
addComment = (text)=>{
  var post_id = this.props.match.params.post_id;
  var newComment = {text:text};
  this.post("posts/"+post_id+"/comments",newComment,()=>{
    this.getPost();
  },(failResponse)=>{console.log(failResponse);});
}
componentDidMount(){
  this.getPost();
}
render(){
  var arrowContainerStyle={
    position:'absolute',
    left:'10px',
    top:'14px',
    zIndex:'10'
    //pointerEvents:'none'
  }
  var arrowBack=(
    <div style={arrowContainerStyle}>
      <Link to='/' >
        <FontIcon className="material-icons" style={{fontSize:'40px'}} >keyboard_arrow_left</FontIcon>
      </Link>
    </div>

  );
  var post = this.state.post;
  if(!post){
    return(
      <div style={ {width:'40px',margin:"40px auto"} }>
        <RefreshIndicator
          size={40}
          top={0}
          left={0}
          status="loading"
          style={ {position:'relative'} }
        />
      </div>
    )
  }
  var commentItems = this.state.comments.map((comment)=>{
    return(<Comment key={comment.id} comment={comment} smallRefresh={this.getPost}/>);
  });
  return(
  <Post post={post} additionalClasses="detailed-post" refresh={this.getPost}>
    <div className="post-details">
      <CardTitle title="Ingredients"/>
      <CardText>
        <span className="white-spaced">{post.ingredients}</span>
      </CardText>
      <CardTitle title="Preparation" />
      <CardText>
        <span className="white-spaced">{post.preparation}</span>
      </CardText>
      <CardTitle title="Comments"/>
      <CommentForm onSubmit={this.addComment}/>
      <CardText className="comment-top-container">{commentItems}</CardText>
    </div>
  </Post>
  );
}
}
export default DetailedPost;
