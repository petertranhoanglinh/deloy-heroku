import React from "react";
import HeaderProduct from "./HeaderProduct";
import ListProduct from "./ListProduct"
import Util from "./Util";
const token = localStorage.getItem('token');

const AuthStr = 'Bearer ' + token;
class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DataisLoaded: false,
        };
    }
    componentDidMount() {
        let headersList = {
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            "Accept-Language": "application/json",
            "Authorization": AuthStr
        }
        fetch(Util.URL_REST + "api/getUserDetail", {
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
        const { DataisLoaded } = this.state;
        if (!DataisLoaded) return <div>
            <h6 className="text-title-cl"> Plesea login.... </h6> </div>;
        else
            return (
                <div>
                    <HeaderProduct></HeaderProduct>
                    <ListProduct></ListProduct>
                </div>
            );
    }
}
export default Product;