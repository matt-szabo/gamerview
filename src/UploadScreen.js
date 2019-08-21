import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from 'material-ui/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';


class UploadScreen extends React.Component{

  
 
    constructor(props){
      super(props);
      this.state={
        user:'',
        session:'',
        stars:'',
        description:'',
        dupmsg:false
      }
    }
  


    handleClick(event){
      event.preventDefault();

      var apiBaseUrl = "http://localhost:5000/api/";
      var self = this;
      var payload={
      "user": this.props.userid,
      "session":this.state.session,
      "stars":this.state.stars,
      "description":this.state.description
      }
      axios.post(apiBaseUrl+'/record', payload)
     .then(function (response) {
       if(response.data.code == 200){
        self.setState({dupmsg:false})
         var loginscreen=[];
         loginscreen.push(<UploadScreen parentContext={this}/>);
         var loginmessage = "Not Registered yet.Go to registration";
         self.props.parentContext.setState({loginscreen:loginscreen,
         loginmessage:loginmessage,
         buttonLabel:"Register",
         isLogin:true
          });
         
       }
       else if(response.data.code == 400){
         
         self.setState({dupmsg:true})
       }
     })
     .catch(function (error) {
       console.log(error);
     });

     this.setState({
    
      session:'',
      stars:'',
      description:''
     })

    }
  
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }
    goHome = () => {
      window.location.reload(false);
    }

    render() {
      var pStyle = {
        color: 'red',
       
      };
   
      return (
        <div>
          <MuiThemeProvider>
            <div>
            <RaisedButton label="Home" primary={true} style={style} onClick={(event) => this.goHome(event)}/>

            <AppBar showMenuIconButton={false}
               title="Record your feedback"
             />
          
             <br/>

             Select your Game
             <br/>

             <FormControl >
             <Select
             value={this.state.session}
             onChange={this.handleChange}
             inputProps={{
               name: 'session',
               id: 'game-simple',
             
             }}
                
            >
                    <MenuItem value="Zelda">Zelda</MenuItem>
                    <MenuItem value="Super Mario">Super Mario</MenuItem>
                    <MenuItem value="Street Fighter">Street Fighter</MenuItem>
                    <MenuItem value="RC Pro AM">RC Pro AM</MenuItem>

             </Select>
             </FormControl>

        <br/>

            Select your star rating
            <br/>
             <Select
                value={this.state.stars}
                onChange={this.handleChange}
                inputProps={{
                  name: 'stars'
                
                }}
            >
                    <MenuItem value={"1"}>One</MenuItem>
                    <MenuItem value={"2"}>Two</MenuItem>
                    <MenuItem value={"3"}>Three</MenuItem>
                    <MenuItem value={"4"}>Four</MenuItem>
                    <MenuItem value={"5"}>Five</MenuItem>

             </Select>

        <br/>

     
             <TextField
               hintText="Enter your description"
               floatingLabelText="description"
               value={this.state.description}
               onChange = {(event,newValue) => this.setState({description:newValue})}
               />
             <br/>
             <RaisedButton label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}/>
            </div>

                

           </MuiThemeProvider>

           {this.state.dupmsg ? <p style={pStyle}>{"You have already reviewed this game."}</p> : null}
        </div>
      );
    }
  }
  const style = {
    margin: 15,
  };


export default UploadScreen;
