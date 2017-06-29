import React ,{ Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

class BasicAddDialogButton extends Component{
  state={
    dialogOpen:false,
    title:"",
    description:""
  }
  handleDialogOpen = ()=>{
    this.setState({dialogOpen:true})
  }
  handleDialogClose = ()=>{
    this.setState({dialogOpen:false});
  }
  handleDialogSubmit = ()=>{
    var newItem={
      title:this.state.title,
      description:this.state.description
    };
    this.props.add(newItem);
    this.setState({
      dialogOpen:false,
      title:"",
      description:""
    });
  }
  handleTitleChange = (e)=>{
    //e.preventDefault();
    this.setState({title:e.target.value});
  }
  handleDescriptionChange = (e)=>{
  //  e.preventDefault();
    this.setState({description:e.target.value});
  }
  submitButtonDisabled = ()=>{
    return !(this.state.title.length>0 && this.state.description.length>0) ;
  }
  render(){
    var actions=[
      <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleDialogClose}
        />,
        <FlatButton
          label="Submit"
          primary={true}
          onTouchTap={this.handleDialogSubmit}
          disabled={this.submitButtonDisabled()}
        />,
    ];
    return(
    <div className="basic-add-container">
      <Dialog
        title={this.props.title}
        actions={actions}
        modal={true}
        open={this.state.dialogOpen}>
        <TextField floatingLabelText="title"
           type="text" fullWidth={true}
           value={this.state.title}
           onChange={this.handleTitleChange}/>
        <br/>
        <TextField
          floatingLabelText="description"
          type="text"
          multiLine={true}
          fullWidth={true}
          value={this.state.description}
          onChange={this.handleDescriptionChange}/>
          {this.props.message ? this.props.message : ""}
      </Dialog>
      <FloatingActionButton onClick={this.handleDialogOpen} mini={this.props.mini ? true : false}><ContentAdd/></FloatingActionButton>

      </div>);
  }
}
export default BasicAddDialogButton;
