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
                                        <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{ width: "40 px", padding: "20px" }}>
                                            <div className="thumbnail">
                                                <img src={Util.URL_REST + product.image}
                                                    alt="image" style={{ width: "80px", height: "100px" }} onClick={() => this.openImg(Util.URL_REST + product.image)} />
                                                <div style={{ width: "110px", height: "110px" , textAlign: 'center'}}>
                                                    <h6>{product.pdtName}</h6>
                                                    <p>
                                                        {product.price} {product.kindCoin}
                                                    </p>
                                                    <p>
                                                        <Link to={'/productDetail/' + product.pdtId}  className="btn">
                                                        <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>)
                            }
                        </div>
                    </div>
                </div>
            );
    }
}

export default ListProduct;