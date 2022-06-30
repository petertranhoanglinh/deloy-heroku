import React from "react";
import Util from "./Util";
class TransCoin extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            coins: [],
            DataisLoaded: false,
            searchCoin: '',
        };
    }

    TransCoin = (coinId) => {
        fetch(Util.URL_REST + "api/coin/getMaketCap/" + coinId).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.componentDidMount();
            })

    }
    setPram = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }
    componentDidMount() {
        var a = -1
        fetch(Util.URL_REST + "api/coin/getAllCoin/" + a, {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    coins: json,
                });
            })
        

    }


    render() {
      
        
        const {coins } = this.state;
            return (
            <div className="container">
                <select style={{marginRight:'10px' , width:'30%',float:'left'}} class="form-control">
                {
                            coins.map(
                                    coin =>
                                     <option key={coin.coinId} value = {coin.coinId}>{coin.coinName}</option>
                                        
                                )
                }
                </select>

                <span style={{marginRight:'50px'}}>TO</span>

                <select class="form-control" style={{width:'30%' , float:'right'}}>
                {
                            coins.map(
                                    coin =>
                                     <option key={coin.coinId} value = {coin.coinId}>{coin.coinName}</option>
                                        
                                )
                }
                </select>
                
                
            </div>
            );
    }
}

export default TransCoin;