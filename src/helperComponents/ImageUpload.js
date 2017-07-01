import React from 'react';
import AuthComponent from '../helperComponents/AuthComponent';
import FlatButton from 'material-ui/FlatButton';
import ImageStore from '../services/ImageStore';
import '../css/ImageUpload.css';
import FontIcon from 'material-ui/FontIcon';
import RefreshIndicator from 'material-ui/RefreshIndicator';

class ImageUpload extends AuthComponent{
  state={
    file:null,
    imgSrc:null,
    formData:null,
    uploading:false,
    finishedUpload:false,
  }
  handleChange = (e)=>{

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e)=>{
      this.setState({imgSrc:e.target.result});
    }
    reader.readAsDataURL(file);
    this.setState({file:file});
    if(this.props.autoUpload){
      this.uploadFile(file);
    }
  }
  buttonShouldBeDisabled=()=>{
    return this.state.file == null;
  }
  handleSubmit = ()=>{
    var file = this.state.file;
    this.uploadFile(file);

  }
  uploadFile = (file)=>{
    this.setState({uploading:true,finishedUpload:false});
    this.query("signed_url",{filename:file.name},(response)=>{

     ImageStore.uploadFile(response.presignedPost,file,(location)=>{
       this.props.onUpload(location);
       this.setState({uploading:false,finishedUpload:true});

     });
    },(failResponse)=>{
      console.log(failResponse);
    },true);
  }
render(){
  var style={
    refresh: {
      display: 'inline-block',
      position: 'relative',
      float:'right'
    },
  };
  var loadingIndicator = (<RefreshIndicator
    size={40}
    top={0}
    left={0}
    status="loading"
     style={style.refresh}
  />)
      return (
    <div>
      <div className="imgage-container" >
      { this.state.imgSrc ? <img src={this.state.imgSrc} alt="" className="image-preview"/> : <div></div>}

      </div>
      <form className="file-upload">
         <FontIcon className="material-icons" >file_upload</FontIcon>
          <input type="file" accept="image/*" id="input" name="file" onChange={this.handleChange} className="image-input"/>

      </form>
      {this.state.uploading ? loadingIndicator : <div></div>}
      {this.state.finishedUpload ? <FontIcon className="material-icons finished-upload" >done</FontIcon> : <div></div>}

      {!this.props.autoUpload ? <FlatButton onClick={this.handleSubmit} disabled={this.buttonShouldBeDisabled()}>Upload</FlatButton> : <div></div>}

    </div>
  )
}


}
export default ImageUpload;
