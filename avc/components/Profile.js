import React from "react";
import Util from "./Util";

const token = localStorage.getItem("token");
const AuthStr = "Bearer " + token;
class Profile extends React.Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      DataisLoaded: false,
      imgData: null,
      isUpload: false,
      photo: "",
      imageFileNameOld: "",
    };
    this.onImageChange = this.onImageChange.bind(this);
  }
  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        photo: URL.createObjectURL(event.target.files[0]),
        imgData: event.target.files[0],
      });
    }
  };
  setPram = (event) => {
    this.setState({ [event.target.name]: event.target.value.trim() });
  };
  openImg = () => {
    window.location.href = Util.URL_REST + this.state.imageFileNameOld;
  };
  upLoad = () => {
    let headersList = {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      Authorization: AuthStr,
      "Accept-Language": "application/json",
    };

    const formData = new FormData();
    formData.append("imgData", this.state.imgData);
    formData.append("imageFileNameOld", this.state.imageFileNameOld);

    // let bodyContent = JSON.stringify({
    //   imgData:formData
    // });

    fetch(Util.URL_REST + "api/user/upload", {
      method: "POST",
      body: formData,
      headers: headersList,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert(data.returnMessage);
        console.log(data);
        window.location.href = Util.URL + "profile";
      });
  };
  componentDidMount() {
    let headersList = {
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Accept-Language": "application/json",
      Authorization: AuthStr,
    };
    fetch(Util.URL_REST + "api/getUserDetail", {
      method: "GET",
      headers: headersList,
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        this.setState({
          user: json,
          DataisLoaded: true,
          photo: Util.URL_REST + json.photo,
          imageFileNameOld: json.photo,
        });
      });
  }
  render() {
    const { DataisLoaded, user } = this.state;
    if (!DataisLoaded)
      return (
        <div>
          <h6 className="text-title-cl"> Plesea login.... </h6>{" "}
        </div>
      );
    else
      return (
        <div className="container">
          {/* Account page navigation*/}
          <hr className="mt-0 mb-4" />
          <div className="row">
            <div className="col-xl-4">
              {/* Profile picture card*/}
              <div className="card mb-4 mb-xl-0">
                <div className="card-body text-center">
                  {/* Profile picture image*/}
                  <img
                    className="img-account-profile rounded-circle mb-2"
                    src={this.state.photo}
                    alt=""
                    onChange={this.changeHandler}
                    onClick={this.openImg}
                  />
                  {/* Profile picture help block*/}

                  <div className="small font-italic text-muted mb-4">
                    Upload your avatar{" "}
                  </div>
                  {/* Profile picture upload button*/}
                  <input
                    type="file"
                    name="myImage"
                    onChange={this.onImageChange}
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              {/* Account details card*/}
              <div className="card mb-4">
                <div className="card-body">
                  <form>
                    {/* Form Group (username)*/}
                    <div className="mb-3">
                      <label className="small mb-1" htmlFor="inputUsername">
                        Username
                      </label>
                      <input
                        className="form-control"
                        id="inputUsername"
                        type="text"
                        value={user.userName}
                      />
                    </div>
                    {/* Form Row*/}
                    <div className="row gx-3 mb-3">
                      {/* Form Group (first name)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputFirstName">
                          UserId
                        </label>
                        <input
                          className="form-control"
                          id="inputFirstName"
                          type="text"
                          value={user.userId}
                        />
                      </div>
                      {/* Form Group (last name)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLastName">
                          Country
                        </label>
                        <input
                          className="form-control"
                          id="inputLastName"
                          type="text"
                          value={user.ctrId}
                        />
                      </div>
                    </div>
                    {/* Form Row        */}
                    <div className="row gx-3 mb-3">
                      {/* Form Group (organization name)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputOrgName">
                          Rank
                        </label>
                        <select
                          name=""
                          id="input"
                          class="form-control"
                          value={user.rankCd}
                        >
                          <option value={"DIAMOND"}>Diamond (400$/year)</option>
                          <option value={"GOLD"}>Gold (300$/year)</option>
                          <option value={"SIVEL"}>Sivel (100$/year)</option>
                          <option value={"STANDARD"}>Standard (free)</option>
                        </select>
                      </div>
                      {/* Form Group (location)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputLocation">
                          Role
                        </label>
                        <select
                          name=""
                          id="input"
                          class="form-control"
                          value={user.role}
                        >
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      </div>
                    </div>
                    <div className="row gx-3 mb-3">
                      {/* Form Group (phone number)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputPhone">
                          Referral code
                        </label>
                        <input
                          className="form-control"
                          id="inputPhone"
                          type="text"
                          disabled
                          value={user.referralCode}
                        />
                      </div>
                      {/* Form Group (birthday)*/}
                      <div className="col-md-6">
                        <label className="small mb-1" htmlFor="inputBirthday">
                          Number of people you have referred
                        </label>
                        <input
                          className="form-control"
                          id="inputBirthday"
                          type="text"
                          name="birthday"
                          disabled
                          value={user.rate}
                        />
                      </div>
                    </div>
                    {/* Save changes button*/}
                    <button
                      className="btn btn-primary btnSaveProfile"
                      type="button"
                      onClick={this.upLoad}
                    >
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
export default Profile;
