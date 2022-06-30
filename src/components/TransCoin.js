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
            return (
            <div>
              
            </div>
            );
    }
}

export default TransCoin;