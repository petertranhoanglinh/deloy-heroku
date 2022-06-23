/* eslint-disable jsx-a11y/alt-text */
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Util from "./Util"
import Pagination from "react-js-pagination";

const ProductDetail = () =>{
    
    const {pdtId} = useParams();
    const [state, setValue] = useState({pdtID:pdtId
      , product:{}
      , description:""
      , comment : ""
      , rate : 1}
      );
    const [state1, setData] =useState({activePage:1 ,rewiew: []});
   
   // setValue({pdtID: pdtId});
   useEffect(() => {
    
    const fetchData = async () => {
    await fetch(Util.URL_REST+"api/product/getPdt/"+pdtId, {
        method: "GET",
        headers: Util.headersList
        }).then((res) => res.json())
        .then((json) => {
            setValue({
                product: json,
                description: json.description,
            });
    })
    };
    fetchData();
  }, [pdtId]);
  const handlePageChange = (activePage) => {
     fetch(Util.URL_REST+"api/rewiew/getRewiew/"+pdtId+"/" + activePage, {
      method: "GET",
      headers: Util.headersList
      }).then((res) => res.json())
      .then((json) => {
          setData({
               activePage:activePage,
               rewiew: json
          });
  })  
  }
  const getAll = () => {
    fetch(Util.URL_REST+"api/rewiew/getRewiew/"+pdtId+"/" + 1, {
     method: "GET",
     headers: Util.headersList
     }).then((res) => res.json())
     .then((json) => {
         setData({
              activePage:1,
              rewiew: json
         });
 })  
 }
 const addToCart = (pdtId) => {
   fetch(Util.URL_REST+"api/order/callOrdTmt/"+pdtId+"/" + 1, {
    method: "POST",
    headers: Util.headersList
    }).then((res) => res.json())
   .then((json) => {
        alert(json.returnMessage);
        window.location.reload();
    })  
}
    return (
        <div>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" />
        <div className="container">
          {/* product */}
          <div className="product-content product-wrap clearfix product-deatil">
            <div className="row">
              <div className="col-md-5 col-sm-12 col-xs-12">
                <div className="product-image">
                  <div id="myCarousel-2" className="carousel slide">
                    <ol className="carousel-indicators">
                      <li data-target="#myCarousel-2" data-slide-to={0} className />
                      <li data-target="#myCarousel-2" data-slide-to={1} className="active" />
                      <li data-target="#myCarousel-2" data-slide-to={2} className />
                    </ol>
                    <div className="carousel-inner">
                      {/* Slide 1 */}
                      <div className="item active">
                        <img src={Util.URL_REST+state.product.image} className="img-responsive" alt="" />
                      </div>
                      {/* Slide 2 */}
                      <div className="item">
                        <img src={Util.URL_REST+state.product.image1} className="img-responsive" alt="" />
                      </div>
                      {/* Slide 3 */}
                      <div className="item">
                        <img src={Util.URL_REST+state.product.image2} className="img-responsive" alt="" />
                      </div>
                    </div>
                    <a className="left carousel-control" href="#myCarousel-2" data-slide="prev"> <span className="glyphicon glyphicon-chevron-left" /> </a>
                    <a className="right carousel-control" href="#myCarousel-2" data-slide="next"> <span className="glyphicon glyphicon-chevron-right" /> </a>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-md-offset-1 col-sm-12 col-xs-12">
                <h2 className="name" style={{color:'black'}}>
                  {state.product.pdtName}         
                </h2>
                <hr />
                <h3 className="price-container">
                  {Util.setComma(state.product.price)} {state.product.kindCoin}
                </h3>
                <div className="row">
                  <div className="col-sm-12 col-md-6 col-lg-6">
                    <button className="btn btn-success btn-lg" onClick={() => addToCart(state.product.pdtId)}>Add to cart</button>
                  </div>
                </div>
                <hr />
                <div className="description description-tabs">
                  <ul id="myTab" className="nav nav-pills">
                    <li className="active"><a href="#more-information" data-toggle="tab" className="no-margin">Product Description </a></li>
                    <li className><a href="#specifications" data-toggle="tab">Specifications</a></li>
                    <li className><a href="#reviews" data-toggle="tab" onClick={getAll}>Reviews</a></li>
                  </ul>
                  <div id="myTabContent" className="tab-content">
                    <div className="tab-pane fade active in" id="more-information">
                      <br />
                      <strong>Description</strong>
                      <p>
                         {state.description}
                      </p>
                      <strong>Seller</strong>
                      <p>
                         {state.product.createBy}
                      </p>
                      <strong>Rank</strong>
                      <p>
                         {state.product.rank}
                      </p>
                    </div>
                    <div className="tab-pane fade" id="specifications">
                      <br />
                      <dl className>
                        <dt>Connect</dt>
                        <dd>{state.product.note}</dd>
                      </dl>
                    </div>
                    <div className="tab-pane fade" id="reviews">
                    

                      <br />
                        <textarea rows={2} className="form-control" placeholder="Write a review" defaultValue={""} 
                         onChange={(ev) => setValue({...state, comment: ev.target.value})}/>
                         
                         <div class="form-group">
                           <label for="input" class="col-sm-2 control-label">Rate Product</label>
                           <div class="col-sm-3">
                             <select name="" id="input" class="form-control" required="required"
                              onChange={(ev) => setValue({...state, rate: ev.target.value})}>
                               <option value="1">Bad</option>
                               <option value="2">Medium</option>
                               <option value="3">Good</option>
                               <option value="4">Pretty Good</option>
                               <option value="5">Wonderful</option>
                             </select>
                           </div>
                         </div>
                         
                        
                        <div>
                          <button type="submit" className="btn btn-sm btn-primary pull-right" onClick={() => addRewiew(state.product.pdtId,state.rate,state.comment)}>
                            Submit Review
                          </button>
                        </div>
                        <br/>
                       
                          {
                            state1.rewiew.map(
                              wiew =>
                         
                            <div className="comment mt-4 text-justify float-left" style={{paddingTop:"20px"}}>
                              <img src={Util.URL_REST+wiew.image} alt="" className="rounded-circle" width={40} height={40} /> {" "}{wiew.createBy}
                              <br />
                              <p>{wiew.comment}</p>
                              <span style={{fontSize:"10px"}}>{wiew.createDate}</span>
                              <br />
                            </div>
                          
                            )
                           
                          }
                           <Pagination
                          activePage={state1.activePage}
                          itemsCountPerPage={5}
                          totalItemsCount={500}
                          onChange={handlePageChange}
                        />
                    </div>
                   
                  </div>
                 
                </div>
                <hr />
              </div>
            </div>
          </div>
          {/* end product */}
        </div>
      </div>

    );
}
function addRewiew(pdtId,rate,comment){
  if(comment === ""){
    alert("Please press comment");
    return false;
  }else{
    var raw = JSON.stringify({
      pdtId: pdtId,
      rate: rate,
      comment: comment,
    });
    var requestOptions = {
      method: "POST",
      headers: Util.headersList,
      body: raw,
      redirect: "follow",
    };
    fetch(Util.URL_REST + "api/rewiew/add", requestOptions)
    .then((response) => {
      if (response.ok) {
        alert("suscess");
      }
    })
  }
}


export default ProductDetail