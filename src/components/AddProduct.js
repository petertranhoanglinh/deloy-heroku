/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import Util from "./Util"
const userDetail = JSON.parse(localStorage.getItem('userDetail'));
class AddProduct extends React.Component {

	// Constructor
	constructor(props) {
		super(props);
    
      this.state = {
        pdtId:null,
        pdtKind:'',
        note:'',
        description:'',
        
        imageData:'',
        imageData1:'',
        imageData2:'',
        photo:'',
        photo1:'',
        photo2:'',
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
  onImageChange1 = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo1: URL.createObjectURL(event.target.files[0]),
        imageData1:event.target.files[0] 
      });
    }
  };
  onImageChange2 = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo2: URL.createObjectURL(event.target.files[0]),
        imageData2:event.target.files[0] 
      });
    }
  };
  changeDateToString = event =>{
    alert(event.target.value.trim())
  }
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
    var pdtId = window.location.href.replace(Util.URL+"addProduct","")
    if(pdtId !== ""){
      this.setState({
        pdtId:pdtId.replace("/","")
      })
    }
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
                <label className="col-sm-3 control-label">Product ID</label>
                <div className="col-sm-9">
                  <input type="text" value = {this.state.pdtId} placeholder="ProductID" className="form-control" autofocus disabled/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Product Name</label>
                <div className="col-sm-9">
                  <input type="text"  placeholder="Product Name" className="form-control" name = "pdtName" />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Pdt Kind</label>
                <div className="col-sm-9">
                  <input type="text" placeholder="Pdt Kind" className="form-control" name ="pdtKind"  />
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Description</label>
                <div className="col-sm-9">
                <textarea rows={2} className="form-control" placeholder="Write a Description" name= "description"/>                
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Note</label>
                <div className="col-sm-9">
                <textarea rows={2} className="form-control" placeholder="Write a Note" name = "note"/>                
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="col-sm-3 control-label">Start Sale</label>
                <div className="col-sm-9">
                  <input type="date" id="birthDate" className="form-control" name = "startSale"
                   onChange={this.changeDateToString}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="col-sm-3 control-label">End Sale</label>
                <div className="col-sm-9">
                  <input type="date" id="birthDate" className="form-control" name = "endSale" onChange={this.changeDateToString}/>
                </div>
              </div>
              <div className="form-group">
              <label htmlFor="birthDate" className="col-sm-3 control-label">Image</label>
                                    <img src = {this.state.photo} alt="" onChange={this.changeHandler} style = {{width:'150px',padding:"10px"}}/>
                                        <input type="file" name="imageData" onChange={this.onImageChange} />
              </div>
              <div className="form-group">
              <label htmlFor="birthDate" className="col-sm-3 control-label">Image1</label>
                                    <img src = {this.state.photo1} alt="" onChange={this.changeHandler} style = {{width:'150px',padding:"10px"}}/>
                                        <input type="file" name="imageData1" onChange={this.onImageChange1} />
              </div>
              <div className="form-group">
              <label htmlFor="birthDate" className="col-sm-3 control-label">Image2</label>
                                    <img src = {this.state.photo2} alt="" onChange={this.changeHandler} style = {{width:'150px',padding:"10px"}}/>
                                        <input type="file" name="imageData2" onChange={this.onImageChange2} />
              </div>
              <div className="form-group">
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
          </div>
        );
    }
}
export default AddProduct;
