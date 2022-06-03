import React from "react";
import Util from '../components/Util';

export default class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            "username":"",
            "password":"",
        }
        //this.setParams = this.setParams.bind(this) ;
        
    }
    setParams  = (event) =>{
        this.setState({[event.target.name] : event.target.value.trim()})

    }
    login = () =>{
        
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        "userName": this.state.username,
        "password": this.state.password
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch(Util.URL_REST+"api/authenticate", requestOptions)
        .then(response =>{
            console.log('response la' + response);
            if(response.ok){
                return response.json()
            }
            throw Error(response.status)
        })     
        .then(result => {console.log(result)
            localStorage.setItem("token" , result.jwt);
            localStorage.setItem("userDetail" , JSON.stringify(result.userDetail));
            window.location.href = Util.URL;
        })
        .catch(error => {console.log('error', error)
        alert("userName or Password are wrong ")
    });
   
    }
    render(){
        return (
          <div className="login-box">
              <h2>Login</h2>
                <div className="user-box">
                  <input type="text"  name = "username" onChange={this.setParams}/>
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input type="password" name = "password" onChange={this.setParams} />
                  <label>Password</label>
                </div>
               <button  onClick={this.login}>Login</button>
            </div>
            
          );      
    }
}   