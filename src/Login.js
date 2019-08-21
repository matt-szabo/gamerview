import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import UploadScreen from './UploadScreen';
import ReviewScreen from './ReviewScreen';


class Login extends Component {
constructor(props){
  super(props);
  this.state={
  username:'',
  password:'',
  loginPage:[],
  uploadScreen:[],
  loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true

  }
 }

 handleClick(event){
  var apiBaseUrl = "http://localhost:5000/api/";
  var self = this;
  var payload={
  "email":this.state.username,
  "password":this.state.password
  }
  axios.post(apiBaseUrl+'login', payload)
  .then(function (response) {
  if(response.data.code == 200){
  console.log("login successful");
  var uploadScreen=[];
  uploadScreen.push(<UploadScreen appContext={self.props.appContext} userid={payload.email}/>)
  self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
  }
  else if(response.data.code == 300){
    console.log("login successful");
    var uploadScreen=[];
    uploadScreen.push(<ReviewScreen appContext={self.props.appContext}/>)
    self.props.appContext.setState({loginPage:[],uploadScreen:uploadScreen})
    }
  else if(response.data.code == 204){
  console.log("username and password do not match");
  alert("username and password do not match")
  }
  else{
  console.log("username does not exists");
  alert("username does not exist");
  }
  })
  .catch(function (error) {
  console.log(error);
  });
  }


render() {
    return (
      <div>
        <MuiThemeProvider>
          <div>
          <AppBar showMenuIconButton={false}
             title="Login"
           />
           <TextField
             hintText="Enter your Username"
             floatingLabelText="Username"
             onChange = {(event,newValue) => this.setState({username:newValue})}
             />
           <br/>
             <TextField
               type="password"
               hintText="Enter your Password"
               floatingLabelText="Password"
               onChange = {(event,newValue) => this.setState({password:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
         </div>
         </MuiThemeProvider>
      </div>
    );
  }
}
const style = {
 margin: 15,
};
export default Login;