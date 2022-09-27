/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import swal from "sweetalert";
import Util from "./Util"

class Showinfomexcmangager extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            mexc: [],
            secretKey: "",
            accessKey: ""
        };
    }
    setPram = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }

    connectBanlance = () => {
        let headersList = {
            "Accept-Language": "application/json",
            "Content-Type": "application/json"
          };
        var raw = JSON.stringify({
            accessKey: this.state.accessKey,
            secretKey: this.state.secretKey,
            reqTime: '',
            requestParam: '',
        });

        fetch(Util.URL_REST + "api/mexc/getDetailBalance", {
            method: "POST",
            body: raw,
            headers: headersList
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(JSON.stringify(data));
            if(data.returnMessage!= null){
                Util.swal('',data.returnMessage,'error')
            }
            this.setState({
                mexc:data
            })
        })
    }
    render() {
        const {mexc} = this.state;
            return (
                <div>
                    <div className="input-group">
                        <input placeholder="secrect-key" name="secretKey" onChange={this.setPram}></input>
                    </div>

                    <div className="input-group">
                        <input placeholder="accessKey" name="accessKey" onChange={this.setPram}></input>
                    </div>

                    <button type="button" class="btn btn-info" onClick={this.connectBanlance}>connect balance</button>
                    <table className="table table-hover" style={{ height: "720px" }}>
                        <thead>
                            <tr>
                                <th className="text-th-cl">coin_id</th>
                                <th className="text-th-cl">quantity frozen</th>
                                <th className="text-th-cl">quantity available</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            );
    }
}

export default Showinfomexcmangager;