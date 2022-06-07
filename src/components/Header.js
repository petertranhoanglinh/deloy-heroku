import React from "react";
import {Link} from 'react-router-dom'
import Util from "./Util";
export default class Header extends React.Component{
 
    constructor(props){
        super(props)
        var userItem = localStorage.getItem('userItem');
        
        if(userItem == null){
            this.state = {
                text:'',
                image:'',
                showHide:false
            } 
        }else{
            this.state = {
                text:'',
                image:'',
                showHide:false
            } 
        }
        
        this.logout = this.logout.bind(this) ;
      
    }
    setParams  = (event) =>{
        this.setState({[event.target.name] : event.target.value})

    }
    logout(){
       if(localStorage.getItem('token') != null){
        localStorage.removeItem("token");
        localStorage.removeItem("userItem");
        localStorage.removeItem("photo");
        localStorage.removeItem("userDetail");
        window.location.href = Util.URL + "login";
       }
    }
    componentDidMount() {
        fetch(Util.URL_REST + "api/getUserDetail", {
            method: "GET",
            headers: Util.headersList
        }).then((res) => res.json())
            .then((json) => {
                if(Util.userDetail.role === 'ADMIN'){
                  this.setState({
                    showHide:true
                  })
                }
                this.setState({
                  image: Util.URL_REST + json.photo,
                  text:json.userName
                });
        })
     }
    render(){
      
        return (
            <div>
              <meta charSet="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>Beautiful Bootstrap Navbar with Menu Icons</title>
              <link href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" rel="stylesheet" />
              <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
              <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
              <style dangerouslySetInnerHTML={{__html: "\n\tbody {\n\t\tbackground: #eeeeee;\n\t\tfont-family: 'Varela Round', sans-serif;\n\t}\n    .form-inline {\n        display: inline-block;\n    }\n\t.navbar {\n\t\tcolor: #fff;\n\t\tbackground: #926dde;\n\t\tpadding: 5px 16px;\n\t\tborder-radius: 0;\n\t\tborder: none;\n\t\tbox-shadow: 0 0 4px rgba(0,0,0,.1);\n\t}\n\t.navbar img {\n\t\tborder-radius: 50%;\n\t\twidth: 36px;\n\t\theight: 36px;\n\t\tmargin-right: 10px;\n\t}\n\t.navbar .navbar-brand {\n\t\tcolor: #efe5ff;\n\t\tpadding-left: 0;\n\t\tpadding-right: 50px;\n\t\tfont-size: 24px;\t\t\n\t}\n\t.navbar .navbar-brand:hover, .navbar .navbar-brand:focus {\n\t\tcolor: #fff;\n\t}\n\t.navbar .navbar-brand i {\n\t\tfont-size: 25px;\n\t\tmargin-right: 5px;\n\t}\n\t.search-box {\n        position: relative;\n    }\t\n    .search-box input {\n        padding-right: 35px;\n\t\tmin-height: 38px;\n\t\tborder: none;\n\t\tbackground: #faf7fd;\n        border-radius: 3px !important;\n    }\n\t.search-box input:focus {\t\t\n\t\tbackground: #fff;\n\t\tbox-shadow: none;\n\t}\n\t.search-box .input-group-addon {\n        min-width: 35px;\n        border: none;\n        background: transparent;\n        position: absolute;\n        right: 0;\n        z-index: 9;\n        padding: 10px 7px;\n\t\theight: 100%;\n    }\n    .search-box i {\n        color: #a0a5b1;\n\t\tfont-size: 19px;\n    }\n\t.navbar ul li i {\n\t\tfont-size: 18px;\n\t}\n\t.navbar .nav-item span {\n\t\tposition: relative;\n\t\ttop: 3px;\n\t}\n\t.navbar .nav > li a {\n\t\tcolor: #efe5ff;\n\t\tpadding: 8px 15px;\n\t\tfont-size: 14px;\t\t\n\t}\n\t.navbar .nav > li a:hover, .navbar .nav > li a:focus {\n\t\tcolor: #fff;\n\t\ttext-shadow: 0 0 4px rgba(255,255,255,0.3);\n\t}\n\t.navbar .nav > li > a > i {\n\t\tdisplay: block;\n\t\ttext-align: center;\n\t}\n\t.navbar .dropdown-menu i {\n\t\tfont-size: 16px;\n\t\tmin-width: 22px;\n\t}\n    .navbar .dropdown-menu .material-icons {\n        font-size: 21px;\n        line-height: 16px;\n        vertical-align: middle;\n        margin-top: -2px;\n    }\n\t.navbar .dropdown.open > a, .navbar .dropdown.open > a:hover, .navbar .dropdown.open > a:focus {\n\t\tcolor: #fff;\n\t\tbackground: none !important;\n\t}\n\t.navbar .dropdown-menu {\n\t\tborder-radius: 1px;\n\t\tborder-color: #e5e5e5;\n\t\tbox-shadow: 0 2px 8px rgba(0,0,0,.05);\n\t}\n\t.navbar .dropdown-menu li a {\n\t\tcolor: #777 !important;\n\t\tpadding: 8px 20px;\n\t\tline-height: normal;\n\t}\n\t.navbar .dropdown-menu li a:hover, .navbar .dropdown-menu li a:focus {\n\t\tcolor: #333 !important;\n\t\tbackground: transparent !important;\n\t}\n\t.navbar .nav .active a, .navbar .nav .active a:hover, .navbar .nav .active a:focus {\n\t\tcolor: #fff;\n\t\ttext-shadow: 0 0 4px rgba(255,255,255,0.2);\n\t\tbackground: transparent !important;\n\t}\n\t.navbar .nav .user-action {\n\t\tpadding: 9px 15px;\n\t}\n\t.navbar .navbar-toggle {\n\t\tborder-color: #fff;\n\t}\n\t.navbar .navbar-toggle .icon-bar {\n\t\tbackground: #fff;\n\t}\n\t.navbar .navbar-toggle:focus, .navbar .navbar-toggle:hover {\n\t\tbackground: transparent;\n\t}\n\t.navbar .navbar-nav .open .dropdown-menu {\n\t\tbackground: #faf7fd;\n\t\tborder-radius: 1px;\n\t\tborder-color: #faf7fd;\n\t\tbox-shadow: 0 2px 8px rgba(0,0,0,.05);\n\t}\n\t.navbar .divider {\n\t\tbackground-color: #e9ecef !important;\n\t}\n\t@media (min-width: 1200px){\n\t\t.form-inline .input-group {\n\t\t\twidth: 350px;\n\t\t\tmargin-left: 30px;\n\t\t}\n\t}\n\t@media (max-width: 1199px){\n\t\t.navbar .nav > li > a > i {\n\t\t\tdisplay: inline-block;\t\t\t\n\t\t\ttext-align: left;\n\t\t\tmin-width: 30px;\n\t\t\tposition: relative;\n\t\t\ttop: 4px;\n\t\t}\n\t\t.navbar .navbar-collapse {\n\t\t\tborder: none;\n\t\t\tbox-shadow: none;\n\t\t\tpadding: 0;\n\t\t}\n\t\t.navbar .navbar-form {\n\t\t\tborder: none;\t\t\t\n\t\t\tdisplay: block;\n\t\t\tmargin: 10px 0;\n\t\t\tpadding: 0;\n\t\t}\n\t\t.navbar .navbar-nav {\n\t\t\tmargin: 8px 0;\n\t\t}\n\t\t.navbar .navbar-toggle {\n\t\t\tmargin-right: 0;\n\t\t}\n\t\t.input-group {\n\t\t\twidth: 100%;\n\t\t}\n\t}\n" }} />
              <nav className="navbar navbar-inverse navbar-expand-xl navbar-dark">
                <div className="navbar-header">
                  <Link to={'/'}><i className="fa fa-cube" />Brand<b>Name</b></Link>	
                  <button type="button" data-target="#navbarCollapse" data-toggle="collapse" className="navbar-toggle">
                    <span className="navbar-toggler-icon" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                  </button>
                </div>
                {/* Collection of nav links, forms, and other content for toggling */}
                <div id="navbarCollapse" className="collapse navbar-collapse">		
                  <ul className="nav navbar-nav navbar-right">
                    <li className="active"><Link to={'/'}><i className="fa fa-home" /><span>Home</span></Link></li>
                    <li> <Link to={'/balance'}><i className="fa fa-briefcase" /><span>Balance</span></Link></li>
                    <li><Link to={'/product'}><i className="fa fa-gears" /><span>Product</span></Link></li>
                    <li><Link to={'/coin'}><i className="fa fa-users" /><span>Coin</span></Link></li>
                    <li><Link to = {'/a'}><i className="fa fa-pie-chart" /><span>Reports</span></Link></li>
                    <li><Link to={'/message'}><i className="fa fa-envelope" /><span>Messages</span></Link></li>		
                    <li><Link to = {'/notify'}><i className="fa fa-bell" /><span>Notifications</span></Link></li>
                    <li className="dropdown">
                      <a href="a" data-toggle="dropdown" className="dropdown-toggle user-action"><img src={this.state.image} className="avatar" alt="Login ? " />{this.state.text}<b className="caret" /></a>
                      <ul className="dropdown-menu">
                        <li> <Link to={'/profile'}><i className="fa fa-user-o" /> Profile</Link></li>
                        {
                          this.state.showHide?<li><Link to={'/addNotity'}><i className="fa fa-calendar-o" /> Add Notifications</Link></li>:null
                        }
                        <li className="divider" />
                        <li> <Link to={'/signUp'}><i className="fa fa-calendar-o" /> SignUp</Link></li>
                        <li> <Link to={'/login'}><i class="fa fa-sign-in" aria-hidden="true"></i> Login</Link></li>
                        <li onClick={this.logout}> <Link to={'/'}><i className="material-icons"></i> Logout</Link></li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          );
    }
}   
