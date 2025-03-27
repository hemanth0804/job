import React, { Component } from "react";
import "./Dashboard.css";
import { BASEURL, callApi, getSession, setSession } from "./api.js";
import MenuBar from "./MenuBar.jsx";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: "" };
    this.showFullname = this.showFullname.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid"); // Fixed function name
    if (csr === "") this.logout();

    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "users/getFullname", data, this.showFullname);
  }

  showFullname(response) {
    this.setState({ fullname: response });
  }

  logout() {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }

  render() {
    const { fullname } = this.state;
    return (
      <div className="dashboard">
        <div className="header">
          <img className="logo" src="/logo.png" alt="Logo" />
          <div className="logoText">
            Job <span>Portal</span>
          </div>
          <img
            className="logout"
            src="/logout.png"
            alt="Logout"
            onClick={() => this.logout()}
          />
          <label>{fullname}</label>
        </div>
        <div className="menu">
          <MenuBar/>
          </div>
        <div className="outlet">OUTLET</div>
      </div>
    );
  }
}
