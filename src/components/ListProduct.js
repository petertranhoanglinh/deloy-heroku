/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { Link } from 'react-router-dom'
import Util from "./Util"

class ListProduct extends React.Component {
    
    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            DataisLoaded: false,
            'pdtName': '*',
            pdtKinds:[],
            'kind':'*'
        };
    }
    openImg = (src) => {
        window.location.href = src;
    }
    searchProduct = () => {
        var pdtName = this.state.pdtName;
        var kind = this.state.kind;
        if(pdtName === ""){
            pdtName = "*";
        }
        if(kind === ""){
            kind = "*";
        }
        
        fetch(Util.URL_REST+"api/product/getProduct/" + pdtName +"/" + kind, {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                this.setState({
                    products: json,
                    DataisLoaded: true
                });
            })

    }
    setPram = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }
    componentDidMount() {
        fetch(Util.URL_REST+"api/product/getProduct/*/*", {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                this.setState({
                    products: json,
                    DataisLoaded: true
                });
            })
        fetch(Util.URL_REST+"api/product/getPdtKind", {
                method: "GET",
                headers: Util.headersList
            }).then((res) => res.json())
                .then((json) => {
                    this.setState({
                        pdtKinds: json
                    });
                })

    }
    render() {
        const { DataisLoaded, products, pdtKinds } = this.state;
        if (!DataisLoaded) return <div>
            <h6 className="text-title-cl"> Plesea login.... </h6> </div>;
        else
            return (
                <div>
                    <div className="container">
                        <input  name='pdtName' onChange={this.setPram} placeholder='Search product' />
                        <select  onChange={this.setPram} name = "kind">
                        <option value= "*">All Product kind</option>
                            {
                                pdtKinds.map(
                                    product =>
                                      <option value={product.pdtKind}>{product.pdtKind}</option>
                                )
                            }
                        </select>
                        <button onClick={this.searchProduct}>search</button>
                        
                        <div class="row" >
                            {
                                products.map(
                                    product =>
                                        <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{paddingTop: "20px" }}>
                                            <div className="thumbnail" style={{textAlign: 'center'}}>
                                                <img src={Util.URL_REST + product.image}
                                                    alt="image" style={{ width: "150px", height: "120px" }} onClick={() => this.openImg(Util.URL_REST + product.image)} />
                                               
                                                    <h6>{product.pdtName}</h6>
                                                    <p>
                                                        {product.price} {product.kindCoin}
                                                    </p>
                                                    <p>
                                                        <Link to={'/productDetail/' + product.pdtId}  className="btn">
                                                        <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                                        </Link>
                                                        {
                                                        Util.userDetail.role == "ADMIN"?
                                                        <Link to={'/addProduct/' + product.pdtId}  className="btn">
                                                            <span  aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wrench-adjustable" viewBox="0 0 16 16">
                                                                <path d="M16 4.5a4.492 4.492 0 0 1-1.703 3.526L13 5l2.959-1.11c.027.2.041.403.041.61Z"/>
                                                                <path d="M11.5 9c.653 0 1.273-.139 1.833-.39L12 5.5 11 3l3.826-1.53A4.5 4.5 0 0 0 7.29 6.092l-6.116 5.096a2.583 2.583 0 1 0 3.638 3.638L9.908 8.71A4.49 4.49 0 0 0 11.5 9Zm-1.292-4.361-.596.893.809-.27a.25.25 0 0 1 .287.377l-.596.893.809-.27.158.475-1.5.5a.25.25 0 0 1-.287-.376l.596-.893-.809.27a.25.25 0 0 1-.287-.377l.596-.893-.809.27-.158-.475 1.5-.5a.25.25 0 0 1 .287.376ZM3 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                                                                </svg>
                                                            </span>
                                                        </Link>:null
                                                        }
                                                        
                                                    </p>
                                                
                                            </div>
                                        </div>
                                        )
                            }
                        </div>
                    </div>
                </div>
            );
    }
}

export default ListProduct;