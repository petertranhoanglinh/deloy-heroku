import React from "react";
import Util from "./Util";

class TransCoin extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            coin1:'BTC',
            coin2:'BTC',
            qty:1,
            coins:[]
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
    trans = ()=>{
        var coin1 = this.state.coin1;
        var coin2 = this.state.coin2;
        var qty = this.state.qty;
        if(qty===null||qty===''){
            qty = 1
        }
        fetch(Util.URL_REST + "api/coin/transCoin/"+coin1+"/"+coin2+"/"+qty, {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                Util.swal({
                    text:  + qty + ' '+coin1+ ' = '+Util.setComma(json) +' '+ coin2,
                    icon: "success",
                  });
            })
    }
    componentDidMount() {
        var a = -1
        fetch(Util.URL_REST + "api/coin/getAllCoin/" + a)
        .then((res) => res.json())
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
                <select onChange={this.setPram} 
                name = 'coin1' style={{marginRight:'10px' , width:'30%',float:'left'}} class="form-control">
                {
                            coins.map(
                                    coin =>
                                     <option key={coin.coinId} onChange={this.setPram}  value = {coin.coinId}>{coin.coinName}</option>
                                        
                                )
                }
                </select>
               <input type = "number" name = 'qty' 
               onChange={this.setPram} style={{marginLeft:'105px'}}></input>
               <button onClick={this.trans}>trans</button>
                <select class="form-control" name = 'coin2'  onChange={this.setPram} 
                style={{width:'30%' , float:'right'}}>
                {
                            coins.map(
                                    coin =>
                                     <option key={coin.coinId}  value = {coin.coinId}>{coin.coinName}</option>
                                        
                                )
                }
                </select>
            </div>
            );
    }
}
export default TransCoin;