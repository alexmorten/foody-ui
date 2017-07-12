import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import '../css/VoteHelper.css';
class VoteHelper extends Component{
  handleUpVote = ()=>{
    this.handleVote("up")
  }
  handleDownVote = ()=>{
    this.handleVote("down");
  }
  handleVote = (value)=>{
    this.props.handleVote(value);
  }
  hasUpVoted(){
    var vote = this.props.votable.vote;
    if(vote){
      return vote.value === "up";
    }
    return false;
  }
  hasDownVoted(){
    var vote = this.props.votable.vote;
    if(vote){
      return vote.value === "down";
    }
    return false;
  }
  render(){
    var votable = this.props.votable;
    var extraUpVoteClass = this.hasUpVoted() ? " used" : "";
    var extraDownVoteClass = this.hasDownVoted() ? " used" : "";
    var tinyClass = this.props.tiny ? " tiny" : "";

    return(
      <div className="vote-helper-container">
        <span className={"rating"+tinyClass}>{votable.points}</span>
        <FontIcon className={"material-icons icon thumb-up"+extraUpVoteClass+tinyClass} onClick={this.handleUpVote} >thumb_up</FontIcon>
        <FontIcon className={"material-icons icon thumb-down"+extraDownVoteClass+tinyClass} onClick={this.handleDownVote}>thumb_down</FontIcon>
      </div>
    );
  }
}
export default VoteHelper;
