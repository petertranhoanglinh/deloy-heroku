import React from "react";
import Util from "./Util";
import Pagination from "react-js-pagination";
class Coin extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            coins: [],
            DataisLoaded: false,
            searchCoin: '',
        };
    }

    UpdatePrice = (coinId) => {
        fetch(Util.URL_REST + "api/coin/getMaketCap/" + coinId).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.componentDidMount();
            })

    }

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //  alert(this.state.activePage);
        this.setState({ activePage: pageNumber });

        fetch(Util.URL_REST + "api/coin/getAllCoin/" + pageNumber, {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    coins: json,
                    DataisLoaded: true
                });
            })

    }

    searchCoin = () => {

        var coinId = this.state.searchCoin;
        fetch(Util.URL_REST + "api/coin/getMaketCap/" + coinId)
            .then((res) => res.json())
            .then((json) => {
                var arr = new Array(json);
                if (json.statusCode === 2) {
                    alert(json.message)
                    return false;
                }
                this.componentDidMount(arr);
            })

    }
    setPram = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }
    componentDidMount(item) {
        if (item == null) {
            fetch(Util.URL_REST + "api/coin/getAllCoin/" + 1, {
                method: "GET",
                headers: Util.headersList
            }).then((res) => res.json())
                .then((json) => {
                    console.log(json);
                    this.setState({
                        coins: json,
                        DataisLoaded: true
                    });
                })
        } else {
            this.setState({
                coins: item,
                DataisLoaded: true
            })
        }

    }


    render() {
        const { DataisLoaded, coins } = this.state;
        if (!DataisLoaded) return <div>
            <h6 className="text-title-cl"> Plesea login.... </h6> </div>;
        else
            return (
                <div>


                    <input type='text' name='searchCoin' onChange={this.setPram} placeholder='Search coinId' />
                    <button onClick={this.searchCoin}>search</button>

                    <table className="table table-hover" style={{height:"720px"}}>
                        <thead>
                            <tr>
                                <th className="text-th-cl">CoinId</th>
                                <th className="text-th-cl">CoinName</th>
                                <th className="text-th-cl">Price</th>
                                <th className="text-th-cl">Update-time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                coins.map(
                                    coin =>
                                        <tr key={coin.coinId}>
                                            <td className="text-td-cl" onClick={() => this.UpdatePrice(coin.coinId)}>{coin.coinId}</td>
                                            <td className="text-td-cl" onClick={() => this.UpdatePrice(coin.coinId)}>{coin.coinName}</td>
                                            <td className="text-td-cl" onClick={() => this.UpdatePrice(coin.coinId)}>{coin.price}</td>
                                            <td className="text-td-cl" onClick={() => this.UpdatePrice(coin.coinId)}>{coin.timeUpdate}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={4500}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </div>
            );
    }
}

export default Coin;