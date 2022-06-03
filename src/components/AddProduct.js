/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import Util from "./Util"

const userDetail = JSON.parse(localStorage.getItem('userDetail'));
class AddProduct extends React.Component {

	// Constructor
	constructor(props) {
		super(props);
        console.log(this.props.routeParams)
		this.state = {
			DataisLoaded: false,
		};
    //console.log(this.props.params.testValue);
    this.onImageChange = this.onImageChange.bind(this)
    this.setPram = this.setPram.bind(this) ;
	}
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo: URL.createObjectURL(event.target.files[0]),
        imageData:event.target.files[0] 
      });
    }
  };
  setPram=(event)=>{
        this.setState({[event.target.name] : event.target.value.trim()});
    }
  handleChange =(event) => {    
    this.setState({range: event.target.value});  
  }
  upLoad= ()=>{
           const formData = new FormData();
           if(this.state.photo !== ""){
            formData.append('imageData',   this.state.imageData);
           }
           formData.append('title',   this.state.title);
           formData.append('range',   this.state.range);
           formData.append('note',   this.state.note);

            // let bodyContent = JSON.stringify({
            //   imgData:formData
            // });

            fetch("http://localhost:8089/api/notify/save", { 
              method: "POST",
              body: formData,
              headers: Util.headersList
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              alert(data.returnMessage);
              console.log(data);
              window.location.href = Util.url+"notify";
            })
    
  }
	componentDidMount() {
            fetch(Util.URL_REST+"api/getUserDetail", { 
                 method: "GET", 
                 headers: Util.headersList
             }).then((res) => res.json())
               .then((json) => {
                   console.log(json);
                   this.setState({
                       DataisLoaded: true,
                   });
               })
   }	
	render() {
		const { DataisLoaded} = this.state;
		if (!DataisLoaded) return <div>
			<h6 className="text-title-cl"> Plesea login.... </h6> </div> ;
    if(userDetail.role !== "ADMIN") return <div>
     <h6 className="text-title-cl"> You do not have permission to add product.... </h6> </div>
        else  
        return (
            <div className="container">
              <h2>Registration</h2>
              <div className="form-group">
                <label className="col-sm-3 control-label">UserId</label>
                <div className="col-sm-9">
                  <input type="text" id="firstName" placeholder="UserId" className="form-control" autofocus />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">User Name</label>
                <div className="col-sm-9">
                  <input type="text" id="lastName" placeholder="User Name" className="form-control" autofocus />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Role</label>
                <div className="col-sm-9">
                  <input type="email" id="email" placeholder="Email" className="form-control" name="Role" />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Rank</label>
                <div className="col-sm-9">
                  <input type="email" id="email" placeholder="Email" className="form-control" name="Rank" />
                </div>
              </div>
              <div className="form-group">  
                <label  className="col-sm-3 control-label">Password*</label>
                <div className="col-sm-9">
                  <input type="password" id="password" placeholder="Password" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Confirm Password*</label>
                <div className="col-sm-9">
                  <input type="password" id="password" placeholder="Password" className="form-control" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="col-sm-3 control-label">Start Sale</label>
                <div className="col-sm-9">
                  <input type="date" id="birthDate" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="col-sm-3 control-label">End Sale</label>
                <div className="col-sm-9">
                  <input type="date" id="birthDate" className="form-control"/>
                </div>
              </div>
              <div className="form-group">
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
          </div>
        );
    }
}
export default AddProduct;