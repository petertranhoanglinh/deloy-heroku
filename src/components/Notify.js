/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Util from "./Util"
import Pagination from "react-js-pagination";

class Notify extends React.Component {

    // Constructor
    constructor(props) {
        super(props);
        this.state = {
            notifys: [],
            DataisLoaded: false,
            showResults: false,
            pageNumber:1
        };
    }
    openImg = (src) => {
        window.location.href = src;
    }
    delete = (id) =>{
        if (window.confirm('Do you want to delete this notification?')){
            fetch(Util.URL_REST+"api/notify/delete/"+id, {
                method: "PUT",
                headers: Util.headersList
            }).then((res) => res.json())
                .then((json) => {
                    alert(json.returnMessage);
                    this.componentDidMount();
             })
        }else{
            return false;
        }
        
    }
    setPram = (event) => {
        this.setState({ [event.target.name]: event.target.value.trim() });
    }
    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
        //  alert(this.state.activePage);
        this.setState({ activePage: pageNumber });

        fetch(Util.URL_REST + "api/notify/getAll/"+pageNumber, {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    notifys: json,
                    DataisLoaded: true
                });
            })

    }
    
    componentDidMount() {
        if(this.state.DataisLoaded === true){
            if(Util.userDetail.role === 'ADMIN'){
                this.setState({
                    showResults : true
                });
            }
        }
        fetch(Util.URL_REST+"api/notify/getAll/1", {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                console.log(json);
                this.setState({
                    notifys: json,
                    DataisLoaded: true
                });
            })

    }
    render() {
        const { DataisLoaded, notifys , showResults} = this.state;
        if (!DataisLoaded) return <div>
            <h6 className="text-title-cl"> Plesea login.... </h6> </div>;
        else
            return (
                <div>
                    <table className="table table-hover" style={{height:"720px"}}>
                        <thead>
                            <tr>
                                <th className="text-th-cl">Title</th>
                                <th className="text-th-cl">Content</th>
                                <th className="text-th-cl">Even Date</th>
                                <th className="text-th-cl">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                notifys.map(
                                    notify =>
                                        <tr key={notify.coinId}>
                                            <td className="text-td-cl">{notify.title}</td>
                                            <td className="text-td-cl">{notify.note}</td>
                                            <td className="text-td-cl">{notify.evenDate}</td>
                                            <td className="text-td-cl" onClick={() => this.openImg(Util.URL_REST + notify.image)}>
                                                <img src={Util.URL_REST + notify.image} className="img-responsive" alt="Image" style={{ width: '70px', textAlign: 'center' }} /></td>
                                            {showResults ? <td>
                                                <button onClick={() => this.delete(notify.id)} type="button" class="btn btn-default" aria-label="Left Align">
                                                   <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                                </button>
                                            </td> : null}
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <Pagination
                          activePage={this.state.activePage}
                          itemsCountPerPage={10}
                          totalItemsCount={500}
                          onChange={this.handlePageChange.bind(this)}
                        />
                </div>
            );
    }
}

export default Notify;