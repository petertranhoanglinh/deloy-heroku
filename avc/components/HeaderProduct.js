/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { Link } from 'react-router-dom'
export default class HeaderProduct extends React.Component {
    render() {
        return (
            <div>
                <div class="navbar" style={{ background: "black" }}>
                    <a class="navbar-brand" href="/sa"></a>
                    <ul class="nav navbar-nav">
                        <li class="active">
                            <Link to={'/listProduct'}>List Product </Link>
                        </li>
                        <li>
                            <Link to={'/addProduct'}>Add Product </Link>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}   
