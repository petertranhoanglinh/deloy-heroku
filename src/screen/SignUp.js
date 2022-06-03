import React from "react";
import Util from "../components/Util";
export default class SignUp extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      "userId": "",
      "password": "",
      "rePassword": "",
      "userName": "",
      "rankCd": "STANDARD",
      "role": "USER",
      "ctrId": "",
      "refferralCode": "",
    }
    this.setParams = this.setParams.bind(this);

  }
  setParams = (event) => {
    this.setState({ [event.target.name]: event.target.value.trim() })

  }
  signUp = () => {
    if (this.state.password !== this.state.rePassword) {
      alert("password incorrect")
      return false;
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "userId": this.state.userId,
      "password": this.state.password,
      "userName": this.state.userName,
      "rankCd": this.state.rankCd,
      "role": this.state.role,
      "ctrId": this.state.ctrId,
      "rate": 0,
      "refferralCode": this.state.refferralCode
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch(Util.URL_REST+"api/addUser", requestOptions)
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response.json()
        }
        throw Error(response.status)
      })
      .then(result => {
        console.log(result)
        alert("suscess Register");
      })
      .catch(error => {
        console.log('error', error)
        alert("userId has used");
      });
   // window.location.reload(false);
  }
  render() {
    return (
      <div className="container">
        <h2 style={{color:"blue"}}>Registration User Welcome Lweb 0.5 </h2>
        <div className="form-group">
          <label className="col-sm-3 control-label">UserId</label>
          <div className="col-sm-9">
            <input type="text" name = "userId" placeholder="UserId" className="form-control" autofocus 
            onChange={this.setParams}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">User Name</label>
          <div className="col-sm-9">
            <input type="text" name ="userName" placeholder="User Name" className="form-control" autofocus 
            onChange={this.setParams}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Rank</label>
          <div className="col-sm-9">
            <select className="form-control" onChange={this.setParams} name = "rankCd"  value={this.state.rankCd} >
                                            <option value="DIAMOND" disabled>Diamond</option>
                                            <option value="GOLD" disabled>Gold</option>
                                            <option value="SIVEL" disabled>Sivel</option>
                                            <option value="STANDARD">Standard</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Role</label>
          <div className="col-sm-9">
          <select className="form-control" onChange={this.setParams} name = "role"  value={this.state.role} >
                                            <option value="USER">User(Standard)</option>
                                            <option value="ADMIN" disabled>Admin(register)</option>
          </select>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Password*</label>
          <div className="col-sm-9">
            <input type="password" name="password" placeholder="Password" className="form-control" 
            onChange={this.setParams} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Confirm Password*</label>
          <div className="col-sm-9">
            <input type="password" name="rePassword" placeholder="Password" className="form-control" 
            onChange={this.setParams}/>
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">Country(Code Country)</label>
          <div className="col-sm-9">
            <input type="text" name = "ctrId" placeholder="Country" className="form-control" autofocus 
            onChange={this.setParams} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-3 control-label">RefferralCode</label>
          <div className="col-sm-9">
            <input type="text" name = "refferralCode" placeholder="refferralCode" className="form-control" autofocus
            onChange={this.setParams} />
          </div>
        </div>
      
        <button type="submit" className="btn btn-primary btn-block" onClick={this.signUp}>Register</button>
      </div>
    );
  }
}   