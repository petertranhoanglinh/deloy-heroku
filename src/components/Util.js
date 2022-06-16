var URL_REST = "https://tienaodemo12.herokuapp.com/";
//var URL_REST = "http://localhost:8089/";
var URL = "http://localhost:3000/";
//var URL = "https://lweb5.herokuapp.com/";
const token = localStorage.getItem("token");
const AuthStr = "Bearer " + token;
const userDetail = JSON.parse(localStorage.getItem("userDetail"));
let headersList = {
  "Accept-Language": "application/json",
  Authorization: AuthStr,
  "Content-Type": "application/json",
};
let headersListSave = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  Authorization: AuthStr,
  "Accept-Language": "application/json",
};
// eslint-disable-next-line import/no-anonymous-default-export
export default { URL, URL_REST, headersList, userDetail,headersListSave };
