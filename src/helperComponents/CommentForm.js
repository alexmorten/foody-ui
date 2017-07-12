import React ,{ Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';


import '../css/CommentForm.css';
class CommentForm extends Component{
  state={
    text:""
  }
  handleChange = (e)=>{
    this.setState({text:e.target.value});
  }
  handleSubmit = ()=>{

    this.props.onSubmit(this.state.text);
    this.setState({text:""});
  }
render(){
  return(
    <form className="comment-form-container">
      <TextField
        floatingLabelText="Leave a comment here"
        type="text"
        multiLine={true}
        fullWidth={true}
        value={this.state.text}
        onChange={this.handleChange}/>

      <FlatButton
         className="comment-form-submit"
          onClick={this.handleSubmit}
          style={{position:'absolute',right:'10px',bottom:'0'}}
          >Post!</FlatButton>
    </form>
  );
}
}
export default CommentForm;
