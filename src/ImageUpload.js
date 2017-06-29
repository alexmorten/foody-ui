import React from 'react';
import AuthComponent from './helperComponents/AuthComponent';
import FlatButton from 'material-ui/FlatButton';
import ImageStore from './services/ImageStore';
import './css/ImageUpload.css';
import FontIcon from 'material-ui/FontIcon';
class ImageUpload extends AuthComponent{
  state={
    file:null,
    imgSrc:null,
    formData:null
  }
  handleChange = (e)=>{

    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = (e)=>{
      this.setState({imgSrc:e.target.result});
    }
    reader.readAsDataURL(file);
    this.setState({file:file});
  }
  buttonShouldBeDisabled=()=>{
    return this.state.file == null;
  }
  handleSubmit = ()=>{
    var file = this.state.file;
    console.log(file);
    this.query("signed_url",{filename:file.name},(response)=>{
     ImageStore.uploadFile(response.presignedPost,file,(location)=>{
       this.update("users/"+this.props.user.id,{image:location},(response)=>{
         this.props.refresh();
       });
     });
    },(failResponse)=>{
      console.log(failResponse);
    })
  }
render(){
  var imagePreview;
  if(this.state.imgSrc){
    imagePreview=(
      <img src={this.state.imgSrc} alt="" className="image-preview"/>
    );
  }
  return (
    <div>
      {imagePreview}
      <form className="file-upload">
         <FontIcon className="material-icons" >file_upload</FontIcon>
          <input type="file" accept="image/*" id="input" name="file" onChange={this.handleChange} className="image-input"/>

      </form>

      <FlatButton onClick={this.handleSubmit} disabled={this.buttonShouldBeDisabled()}>Upload</FlatButton>
      {/* <FontIcon className="material-icons" >file_upload</FontIcon> */}
    </div>
  )
}


}
export default ImageUpload;
