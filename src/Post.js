import React, {Component} from 'react';
import {Card, CardHeader, CardMedia, CardText} from 'material-ui/Card';
import {Link} from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import BasicDeleteDialogButton from './helperComponents/BasicDeleteDialogButton';
import FontIcon from 'material-ui/FontIcon';
import AuthComponent from './helperComponents/AuthComponent';
import VoteHelper from './helperComponents/VoteHelper';
import './css/Post.css';
class Post extends AuthComponent{
  handleDelete = ()=>{
    this.props.deletePost(this.props.post);
  }
  handleVote = (value)=>{
    var post=this.props.post;
    this.post("posts/"+post.id+"/votes",{value:value},()=>{
      if(this.props.refresh)this.props.refresh();
    });
  }
  render(){
    var post = this.props.post;
    var image = post.image_processing ? (<CardMedia ><img src={post.image_medium} alt="" /></CardMedia>) : (<div>Image is processing</div>)
    var linkableStuff = ( <div> <CardHeader
       title={post.title}
       subtitle={post.user.fullname}
       avatar={<Avatar src={post.user.avatar_thumb} />} />
       {image}
       </div>
    );
    var shouldLink = this.props.link;
    var arrowBack = this.props.arrowBack || <div></div>;
    return(
      <Card className={"post " + this.props.additionalClasses ? this.props.additionalClasses : ""}>
        { shouldLink ?  (<Link to={"posts/"+post.id}>
          {linkableStuff}
        </Link>) : linkableStuff}
        {arrowBack}
         <CardText className="post-icon-container">
           <VoteHelper votable={post} handleVote={this.handleVote} />
           <a href={post.image_original} className="icon"><FontIcon className="material-icons" >file_download</FontIcon></a>
           <BasicDeleteDialogButton delete={this.handleDelete} itemTitle={post.title} iconClass={"delete-post"}/>
         </CardText>
         {this.props.children}
      </Card>
    )
}
}
export default Post;
