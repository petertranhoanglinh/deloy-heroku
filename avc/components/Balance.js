import React from "react";
import Util from "./Util";
import Pagination from "react-js-pagination";

class Balance extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      balances: [],
      DataisLoaded: false,
      quantitySend: 0,
      contract: "",
      addCoin: "",
      searchAccount: "",
      showHideButton: true,
      activePage:1
    };
  }
  handleClick = (event) => {
    // alert(quantityCoin)
    this.setState({ [event.target.name]: event.target.value });
  };

  withdraw = (quantityCoin, coinId) => {
    if (window.confirm("Do you want to send coins?")) {
      if (this.state.quantitySend > quantityCoin) {
        alert(
          "The amount of coins sent cannot be greater than the amount available"
        );
        return false;
      }
      var raw = JSON.stringify({
        contract: this.state.contract,
        coinId: coinId,
        quantity: this.state.quantitySend,
      });

      var requestOptions = {
        method: "POST",
        headers: Util.headersList,
        body: raw,
        redirect: "follow",
      };

      fetch(Util.URL_REST + "api/account/withdraw", requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => {
          if (result.returnMessage === "fail") {
            alert("address does not exist");
          } else {
            alert(result.returnMessage);
            this.componentDidMount();
          }
        })
        .catch((error) => console.log("error", error));
    } else {
      return false;
    }
  };
  // ComponentDidMount is used to
  // execute the code
  componentDidMount(pageNumber) {
    var page;
    if(pageNumber === null || pageNumber === undefined){
      page = 1
    }
    else{
      page = pageNumber
    }
    fetch(Util.URL_REST + "api/account/balance/*/"+page, {
      method: "GET",
      headers: Util.headersList,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          balances: json,
          DataisLoaded: true,
          showHideButton: true,
        });
      });
  }
  setPram = (event) => {
    this.setState({ [event.target.name]: event.target.value.trim() });
  };
  searchAccount = () => {
    if (this.state.searchAccount === "") {
      this.componentDidMount();
    } else {
      fetch(Util.URL_REST + "api/account/balance/" + this.state.searchAccount+"/"+1, {
        method: "GET",
        headers: Util.headersList,
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({
            balances: json,
            DataisLoaded: true,
            showHideButton: false,
          });
        });
    }
  };

  addCoin = () => {
    var coinId = this.state.addCoin;

    var raw = "";

    var requestOptions = {
      method: "POST",
      headers: Util.headersList,
      body: raw,
      redirect: "follow",
    };

    fetch(Util.URL_REST + "api/account/add/" + coinId, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.statusCode === 1030) {
          alert(result.message);
          return false;
        } else {
          alert("suscess");
        }
        this.componentDidMount();
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
    if(this.state.searchAccount === ""){
      this.componentDidMount(pageNumber); 
    }else{
      fetch(Util.URL_REST + "api/account/balance/" + this.state.searchAccount+"/"+pageNumber, {
        method: "GET",
        headers: Util.headersList,
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.setState({
            balances: json,
            DataisLoaded: true,
            showHideButton: false,
          });
        });
    }
}

  render() {
    const { DataisLoaded, balances } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h6 className="text-title-cl"> Plesea login... </h6>{" "}
        </div>
      );
    else
      return (
        <div>
          <input
            type="text"
            name="searchAccount"
            onChange={this.setPram}
            placeholder="Enter Account Id"
          />
          <button
            type="button"
            class="btn btn-default"
            aria-label="Left Align"
            onClick={this.searchAccount}
          >
            <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
          </button>
          <br></br>
          <input
            type="text"
            name="addCoin"
            onChange={this.setPram}
            placeholder="add Balance"
          />
          
          <button
            onClick={this.addCoin}
            type="button"
            class="btn btn-default"
            aria-label="Left Align"
          >
            <span class="glyphicon glyphicon-plus" aria-hidden="true"></span>
          </button>
          <table className="table table-hover" style={{height:"650px"}}>
            <thead>
              <tr>
                <th className="text-th-cl">AccountId</th>
                <th className="text-th-cl">CoinId</th>
                <th className="text-th-cl">Contract</th>
                <th className="text-th-cl">Amount of coins</th>
                <th className="text-th-cl">Time Update</th>
                <th className="text-th-cl">Cost</th>
                <th className="text-th-cl">Total amount (USD)</th>
                {this.state.showHideButton ? (
                  <th className="text-th-cl">Amount of coin sent</th>
                ) : null}
                {this.state.showHideButton ? (
                  <th className="text-th-cl">Contract to send</th>
                ) : null}
                {this.state.showHideButton ? (
                  <th className="text-th-cl">Send</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {balances.map((coin) => (
                <tr key={coin.id}>
                  <td className="text-td-cl">{coin.accountId}</td>
                  <td className="text-td-cl">{coin.coinId}</td>
                  <td className="text-td-cl">{coin.contract}</td>
                  <td className="text-td-cl">{coin.quantityReal}</td>
                  <td className="text-td-cl">{coin.timeUpdate}</td>
                  <td className="text-td-cl">{coin.price}</td>
                  <td className="text-td-cl">{coin.value}</td>
                  {this.state.showHideButton ? (
                    <td className="text-td-cl">
                      <input
                        type="number"
                        name="quantitySend"
                        class="form-control"
                        onChange={this.handleClick}
                      />
                    </td>
                  ) : null}
                  {this.state.showHideButton ? (
                    <td className="text-td-cl">
                      <input
                        type="text"
                        name="contract"
                        class="form-control"
                        onChange={this.handleClick}
                      />
                    </td>
                  ) : null}
                  {this.state.showHideButton ? (
                    <td className="text-td-cl">
                      <button
                        onClick={() =>
                          this.withdraw(coin.quantityReal, coin.coinId)
                        }
                        type="button"
                        class="btn btn-default"
                        aria-label="Left Align"
                      >
                        <span
                          class="glyphicon glyphicon-triangle-right"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </td>
                  ) : null}
                </tr>
              ))}
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

export default Balance;
