import {Link} from 'react-router-dom';
import React from "react";
import Util from "./Util";
//import BlockUi from 'react-block-ui';
//import 'react-block-ui/style.css';


class Cart extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            carts: [],
            DataisLoaded: false,
            ordtmt:0,
            sumAmt:0,
            type:'cart',
            showTr:''
        };
    }
    calcel = (ordtmt) => {
      if(this.state.type === 'checkout'){
        this.setState({
          showTr:'',
          type:'cart'
        })
        alert("You have cancel Payment.")
        
      }else{
        if (window.confirm('Do you want to cancel order ?')){
          fetch(Util.URL_REST+"api/order/cancel/"+ordtmt,{
            method: "GET",
            headers: Util.headersList
            }).then((res) => res.json())
           .then((json) => {
                alert(json.returnMessage);
                window.location.reload();
            })  
        }else{
          return false;
        }
      }
      
       
    }
 
    plus = (pdtId) =>{
      var qty = 1;
      fetch(Util.URL_REST+"api/order/callOrdTmt/"+pdtId+"/"+ qty, {
        method: "POST",
        headers: Util.headersList
        }).then((res) => res.json())
       .then((json) => {
            this.componentDidMount();
        })  
    }
    minus =(pdtId)=>{
      var qty = -1
      fetch(Util.URL_REST+"api/order/callOrdTmt/"+pdtId+"/" + qty, {
        method: "POST",
        headers: Util.headersList
        }).then((res) => res.json())
       .then((json) => {
          this.componentDidMount();
        })  
    }
    setPram = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }
    cancelProduct =(ordtmt , pdtId)=>{
      if (window.confirm('Do you want to cancel product ?')){
        fetch(Util.URL_REST+"api/order/cancelOnly/"+ordtmt+"/"+pdtId,{
          method: "GET",
          headers: Util.headersList
          }).then((res) => res.json())
         .then((json) => {
              alert(json.returnMessage);
              window.location.reload();
          })  
      }else{
        return false;
      }
    }
    checkOut =()=>{
      alert(this.state.sumAmt.toFixed(2));
      this.setState({
        showTr:'none',
        type:'checkout'
      }
      )
    }
    componentDidMount() {
      var sumAmt1= 0;
            fetch(Util.URL_REST + "api/order/getListOrderTmt" ,{
                method: "GET",
                headers: Util.headersList
            }).then((res) => res.json())
                .then((json) => {
                  if(json.length === 0){
                    this.setState({
                      carts: json,
                      DataisLoaded: true
                  });
                  }else{
                  for(var i = 0; i < json.length ;i++){
                    sumAmt1 = json[i].amt + sumAmt1;
                  }
                  this.setState({
                      DataisLoaded: true,
                      carts: json,
                      ordtmt:json[0].ordTmt,
                      sumAmt:sumAmt1,
                  });
                  }              
                })
        
              } 
    render() {
        const { DataisLoaded , carts ,type} = this.state;
        if (!DataisLoaded) return <div>
        <h6 className="text-title-cl"> Plesea login.... </h6> </div>;
        else return (
              <div>
                 {/* <BlockUi blocking={!DataisLoaded}></BlockUi> */}
              <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
              
              {/*---- Include the above in your HEAD tag --------*/}
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 col-md-10 col-md-offset-1">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Quantity</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Total($)</th>
                          <th>&nbsp;</th>
                        </tr>
                      </thead>
                      <tbody>
                      
                        {
                            carts.map(
                              cart =>
                              
                          <tr>
                            <td className="col-sm-8 col-md-6">
                              <div className="media">
                                <a className="thumbnail pull-left" href={Util.URL_REST+cart.image}> <img className="media-object" src={Util.URL_REST +cart.image} style={{width: '72px', height: '72px'}}/> </a>
                                <div className="media-body">
                                <Link to={'/productDetail/' + cart.pdtId}>
                                  <h4 className="media-heading">{cart.pdtName}</h4>
                                  <h5 className="media-heading">{cart.pdtId}</h5>
                                </Link>
                                  <span>Seller: </span><span className="text-success"><strong>{cart.createBy}</strong></span>
                                </div>
                            
                              </div></td>
                            <td className="col-sm-1 col-md-1" style={{textAlign: 'center'}}>
                            <td className="col-sm-1 col-md-1 text-center"><strong>{cart.qty}</strong></td>
                              <button onClick={() => this.plus(cart.pdtId)}>+</button>
                              <button onClick={() => this.minus(cart.pdtId)}>-</button>
                            </td>
                            <td className="col-sm-1 col-md-1 text-center"><strong>{ Util.setComma(cart.pricePdt)}{" "}{cart.kindCoin}</strong></td>
                            <td className="col-sm-1 col-md-1 text-center"><strong>{Util.setComma(cart.amt.toFixed(2))}</strong></td>
                            <td className="col-sm-1 col-md-1">
                              <button type="button" className="btn btn-danger"
                               onClick={() => this.cancelProduct(this.state.ordtmt,cart.pdtId)}>
                                <span className="glyphicon glyphicon-remove" /> Remove
                              </button></td>
                         </tr>
                        
                        )
                        }
                      
                        <tr>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td><h5>Subtotal</h5></td>
                          <td className="text-right"><h5><strong>{ Util.setComma(this.state.sumAmt.toFixed(2))}$</strong></h5></td>
                        </tr>
                        <tr>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td><h5>Estimated shipping</h5></td>
                          <td className="text-right"><h5><strong>0$</strong></h5></td>
                        </tr>
                        <tr>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td><h3>Total(USD)</h3></td>
                          <td className="text-right"><h3><strong>{Util.setComma(this.state.sumAmt.toFixed(2))}$</strong></h3></td>
                        </tr>
                        <tr>
                          <td> &nbsp; </td>
                          <td> &nbsp; </td>
                          <td> 
                          <button type="button" class="btn btn-danger" onClick={() => this.calcel(this.state.ordtmt)}>Cancel</button>
                           </td>
                           <td>                            
                              <button type="button" className="btn btn-default">
                              <Link to={'/listProduct'}>  <span className="glyphicon glyphicon-shopping-cart"> Continue Shopping</span></Link>
                              </button>
                            </td>
                          <td>
                            <button type="button" className="btn btn-success" onClick={this.checkOut}
                            style={{display:this.state.showTr}}
                            >
                              Checkout<span className="glyphicon glyphicon-play" />
                            </button>
                            {
                              type==='checkout'? <button type="button" className="btn btn-success">
                                Order<span className="glyphicon glyphicon-play" />
                             </button>:null
                            }
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            );
    }
}

export default Cart;