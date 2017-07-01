import './css/DetailedPost.css';
import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import FontIcon from 'material-ui/FontIcon';
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {Link} from 'react-router-dom';

class DetailedPost extends AuthComponent{
state={
  post:null
}
getPost = ()=>{

  var post_id = this.props.match.params.post_id;
  this.find("posts/"+post_id,(post)=>{
    this.setState({post:post});
  },(failResponse)=>{
    console.log(failResponse);
  });
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
      <Link to='/posts' >
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
  return(
    <Card className="detailed-post">
      {arrowBack}
      <CardHeader
       title={post.title}
       subtitle={post.user.fullname}
       avatar={<Avatar src={post.user.avatar_thumb} />} />
       <CardMedia overlay={<CardTitle title="Imagine a rating here"/>}>
         <img src={post.image_large} alt="" />
       </CardMedia>
       <CardText className="post-icon-container">
         <a href={post.image_original}><FontIcon className="material-icons" >file_download</FontIcon></a>

       </CardText>
       <CardTitle title="Ingredients"/>
       <CardText>
         {post.ingredients}
       </CardText>
       <CardTitle title="Preparation" />
       <CardText>
         {post.preparation}
       </CardText>
    </Card>
  );
}
}
export default DetailedPost;
