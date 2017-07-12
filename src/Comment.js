import './css/Comment.css';
import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import CommentForm from './helperComponents/CommentForm';
import VoteHelper from './helperComponents/VoteHelper';

class Comment extends AuthComponent{
  state={
    subComments:[],
    commentFormOpen:false
  }
  toggleCommentForm = ()=>{
    if(this.state.commentFormOpen){
      this.setState({commentFormOpen:false});
    }else{
      this.setState({commentFormOpen:true});
    }
  }
  addComment = (text)=>{
    var comment = this.props.comment;
    var newComment = {text:text};
    this.setState({commentFormOpen:false});
    this.post("comments/"+comment.id+"/comments",newComment,()=>{
      this.getSubComments();
    },(failResponse)=>{console.log(failResponse);});
  }

  getSubComments=()=>{
    const comment = this.props.comment;
    this.find("comments/"+comment.id+"/comments",(subComments)=>{
      this.setState({subComments:subComments});
    },(failResponse)=>{console.log(failResponse);});
  }
  componentDidMount(){
    this.getSubComments();
  }
  handleVote = (value)=>{
    const comment = this.props.comment;
    this.post("comments/"+comment.id+"/votes",{value:value},()=>{
      this.props.smallRefresh();
    });
  }
  render(){
    const comment = this.props.comment;
    var subCommentItems = this.state.subComments.map((subComment)=>{
      return(<Comment key={subComment.id} comment={subComment} smallRefresh={this.getSubComments}/>);
    });
    return(
      <div className="comment-container">
        <div className="avatar-container">
          <Avatar src={comment.user.avatar_thumb}/>
        </div>
        <div className="comment-body">
          <h4>{comment.user.fullname}</h4>
          <p className="comment-text">{comment.text}</p>
          <div className="comment-icons">
            <FlatButton onClick={this.toggleCommentForm} className="toggle-comment-form-button">
              {this.state.commentFormOpen ? "Cancel" : "Reply"}
            </FlatButton>
            <VoteHelper votable={comment} handleVote={this.handleVote} tiny={true}/>
          </div>
          {this.state.commentFormOpen ? <CommentForm onSubmit={this.addComment}/> : <div></div>}
          <div className="sub-comment-container">
            {subCommentItems}
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
