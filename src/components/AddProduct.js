/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import Util from "./Util"
const userDetail = JSON.parse(localStorage.getItem('userDetail'));
class AddProduct extends React.Component {

	// Constructor
	constructor(props) {
		super(props);
    
      this.state = {
        product:{},
        pdtId:0,
        pdtName:'',
        pdtKind:'',
        note:'',
        description:'',
        price:'',
        kindCoin:'',
        startSale: '00000000',
        endSale:'99999999',
        imageData:null,
        imageData1:null,
        imageData2:null,
        imageOld:'',
        imageOld1:'',
        imageOld2:'',
        photo:null,
        photo1:null,
        photo2:null,
        DataisLoaded: false,
      };
    

	
    //console.log(this.props.params.testValue);
    this.setPram = this.setPram.bind(this) ;
	}
  onImageChange = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo: URL.createObjectURL(event.target.files[0]),
        imageData:event.target.files[0], 
        imageOld:this.state.product.image
      });
    }
  };
  onImageChange1 = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo1: URL.createObjectURL(event.target.files[0]),
        imageData1:event.target.files[0] ,
        imageOld1:this.state.product.image1
      });
    }
  };
  onImageChange2 = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo2: URL.createObjectURL(event.target.files[0]),
        imageData2:event.target.files[0],
        imageOld2:this.state.product.image2
      });
    }
  };
  changeDateToString = event =>{
    this.setState({[event.target.name] : event.target.value.replaceAll('-',"")});
  }
  setPram=(event)=>{
        this.setState({[event.target.name] : event.target.value.trim()});
    }
  handleChange =(event) => {    
    this.setState({range: event.target.value});  
  }
  save= ()=>{
    if (window.confirm('Do you want to update product')){
      const formData = new FormData();
      formData.append('pdtId',   this.state.pdtId);
      formData.append('pdtName',   this.state.pdtName);
      formData.append('price',   this.state.price);
      formData.append('pdtKind',   this.state.pdtKind);
      formData.append('kindCoin',   this.state.kindCoin);
      formData.append('descripton',   this.state.description);
      formData.append('note',   this.state.note);
      formData.append('startSale',   this.state.startSale);
      formData.append('endSale',   this.state.endSale);
      if(this.state.imageData!==null){
        formData.append('imageData',   this.state.imageData);
      }
      if(this.state.imageData1!==null){
        formData.append('imageData1',   this.state.imageData1);
      }
      if(this.state.imageData2!==null){
        formData.append('imageData2',   this.state.imageData2);
      }
     
    
      formData.append('imageOld',   this.state.imageOld);
      formData.append('imageOld1',   this.state.imageOld1);
      formData.append('imageOld2',   this.state.imageOld2);
       fetch(Util.URL_REST+"api/product/add", { 
         method: "POST",
         body: formData,
         headers: Util.headersListSave
       }).then(function(response) {
         return response.json();
       }).then(function(data) {
         alert(data.returnMessage);
         if (window.confirm('Do you want to redirect to product list')){
           window.location.href = Util.URL+"product";
         }else{
           window.location.href = true;
         }
        
       })

    }else{return false;}
  }
	componentDidMount() {
    var pdtId = window.location.href.replace(Util.URL+"addProduct","")
    if(pdtId !== ""){
      fetch(Util.URL_REST+"api/product/getPdt/"+pdtId.replace("/",""), { 
          method: "GET", 
          headers: Util.headersListSave
      }).then((res) => res.json())
        .then((json) => {
            console.log(json);
            this.setState({
                pdtId: json.pdtId,
                pdtName: json.pdtName,
                pdtKind:json.pdtKind,
                description:json.description,
                note:json.note,
                kindCoin:json.kindCoin,
                price:json.price,
                photo: Util.URL_REST+json.image,
                photo1: Util.URL_REST+json.image1,
                photo2: Util.URL_REST+json.image2,
                imageOld:json.image,
                imageOld1:json.image1,
                imageOld2:json.image2,
                product:json
            });
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
              <div className="form-group">
                <label className="col-sm-3 control-label">Product ID</label>
                <div className="col-sm-9">
                  <input type="text" value = {this.state.pdtId} placeholder="ProductID" className="form-control" autofocus disabled/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Product Name</label>
                <div className="col-sm-9">
                  <input type="text"  placeholder="Product Name" className="form-control" name = "pdtName" defaultValue={this.state.pdtName}
                   id = "pdtName" onChange={this.setPram}/>
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Price</label>
                <div className="col-sm-9">
                  <input type="number" placeholder="Price" className="form-control"  name ="price" defaultValue={this.state.price} onChange={this.setPram} />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">KindCoin</label>
                <div className="col-sm-9">
                <input type="text" placeholder="KindCoin" className="form-control"   name ="kindCoin" defaultValue={this.state.kindCoin} onChange={this.setPram} />
                </div>
              </div>
              <div className="form-group">
                <label  className="col-sm-3 control-label">Pdt Kind</label>
                <div className="col-sm-9">
                  <input type="text" placeholder="Pdt Kind" className="form-control" name ="pdtKind" defaultValue={this.state.pdtKind} onChange={this.setPram}/>
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Description</label>
                <div className="col-sm-9">
                <textarea rows={2} className="form-control" placeholder="Write a Description" 
                name= "description" defaultValue={this.state.description} onChange={this.setPram} />                
                </div>
              </div>
              <div className="form-group">
                <label className="col-sm-3 control-label">Note</label>
                <div className="col-sm-9">
                <textarea rows={2} className="form-control" placeholder="Write a Note" 
                name = "note" defaultValue={this.state.note}  onChange={this.setPram}/>                
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="col-sm-3 control-label">Start Sale</label>
                <div className="col-sm-9">
                  <input type="date" id="birthDate" className="form-control" name = "startSale"
                   onChange={this.changeDateToString} defaultValue={this.state.startSale}/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="birthDate" className="col-sm-3 control-label">End Sale</label>
                <div className="col-sm-9">
                  <input type="date" id="birthDate" className="form-control" name = "endSale" onChange={this.changeDateToString} defaultValue={this.state.endSale}/>
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
              <button type="submit" className="btn btn-primary" onClick={this.save}>Save</button>
          </div>
        );
    }
}
export default AddProduct;