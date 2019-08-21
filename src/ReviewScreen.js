import React from 'react';
import axios from 'axios';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


class UploadScreen extends React.Component{

  constructor(props) {
    super(props);
      this.state = {
       data1:null
      };
      this.apiBaseUrl = "http://localhost:5000/api/";
   
  }


  componentDidMount(){
  

      axios.get(this.apiBaseUrl+'/read')
      
      .then(
        (result) => {
          let data_arr = []
          let temp = result.data.results;

          data_arr = temp.map(x => x)
          this.setState({
            data1: data_arr
          });
        }).catch(function (error) {
          console.log(error);
        });
  
    
    }

    goHome = () => {
      window.location.reload(false);
    }

    getSorted = () => {

      axios.get(this.apiBaseUrl+'/sorted')
      
      .then(
        (result) => {
          let data_arr = []
          let temp = result.data.results;
          data_arr = temp.map(x => x)
          this.setState({
            data1: data_arr
          });
        }).catch(function (error) {
          console.log(error);
        });
    }

  render() {


    if (this.state.data1 != null){

     return (
      <div>
        <MuiThemeProvider>
        <RaisedButton label="Home" primary={true} onClick={(event) => this.goHome(event)}/>

        <AppBar showMenuIconButton={false}
             title="Gamer Feedback"
           />

      <Table>


      <TableHead>
      <TableRow>
        <TableCell>User</TableCell>
        <TableCell>Session</TableCell>
        <TableCell>Stars</TableCell>
        <TableCell>Description</TableCell>
      </TableRow>
      </TableHead>



      <TableBody>

      {this.state.data1.map((item) => (
        <TableRow key={item.created}>
          <TableCell>{item.user}</TableCell>
          <TableCell>{item.session}</TableCell>
          <TableCell>{item.stars}</TableCell>
          <TableCell>{item.description}</TableCell>
        

        </TableRow>
      ))}

      </TableBody>
    </Table>

       
        <RaisedButton label="View Sorted" primary={true} onClick={this.getSorted}/>


        </MuiThemeProvider>
    </div>

      
     );
    }
    else{
      return <p>No Feedback Yet</p>;
    }
    

  }
}

export default UploadScreen;
