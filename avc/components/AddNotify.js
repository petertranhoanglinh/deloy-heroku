import React from "react";
import Util from "./Util"

const token = localStorage.getItem('token');
const AuthStr = 'Bearer '+token;
class AddNotify extends React.Component {

	// Constructor
	constructor(props) {
		super(props);
		this.state = {
			DataisLoaded: false,
            title:'',
            range:'DIAMOND',
            note:'',
            imageData:'',
            photo: ''

		};
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
            let headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Authorization": AuthStr,
            "Accept-Language": "application/json",
            }

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

            fetch(Util.URL_REST+"api/notify/save", { 
              method: "POST",
              body: formData,
              headers: headersList
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              alert(data.returnMessage);
              console.log(data);
              window.location.href = Util.URL+"notify";
            })
    
  }
	componentDidMount() {
            let headersList = {
                "User-Agent": "Thunder Client (https://www.thunderclient.com)",
                "Accept-Language": "application/json",
                "Authorization" : AuthStr
               } 
            fetch(Util.URL_REST+"api/getUserDetail", { 
                 method: "GET", 
                 headers: headersList
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
        else  
        return (
            <div>
                    <div className="container">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-8 col-xl-6">
                            <div className="card rounded-3">
                            <div className="card-body p-4 p-md-5">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                    <div className="form-outline datepicker">
                                    <label htmlFor="exampleDatepicker1" className="form-label">Title</label>
                                        <input type="text" className="form-control" onChange={this.setPram} name = "title"/>
                                    </div>
                                    </div>
                                    <div className="col-md-6">
                                    <div className="form-outline">
                                    <label className="form-label" htmlFor="form3Example1w">Range</label>
                                        <select className="form-control" onChange={this.handleChange} name = "range"  value={this.state.range} >
                                            <option value="DIAMOND">Diamond</option>
                                            <option value="GOLD">Gold</option>
                                            <option value="SIVEL">Sivel</option>
                                            <option value="STANDARD">Standard</option>
                                        </select>
                                    </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                    <div className="form-outline datepicker">
                                    <label htmlFor="exampleDatepicker1" className="form-label">Content</label>
                                        <input type="text" className="form-control" onChange={this.setPram} name = "note"/>
                                       
                                    </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                    <img src = {this.state.photo} alt="" onChange={this.changeHandler} style = {{width:'150px',padding:"10px"}}/>
                                        <input type="file" name="imageData" onChange={this.onImageChange} />
                                    </div>
                                    
                                </div>
                                <button type="button" class="btn btn-primary" onClick={this.upLoad}>Add Notify</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
            </div>
        );
    }
}
export default AddNotify;