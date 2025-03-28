import React, { Component } from 'react';
import './MenuBar.css';
import { BASEURL, callApi, getSession } from './api';

export default class MenuBar extends Component {
  constructor() {
    super();
    this.state = { menuItems: [] };
    this.loadMenus = this.loadMenus.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid");
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "menus/getmenusbyrole", data, this.loadMenus);
  }

  loadMenus(response) {
    try {
      let data = JSON.parse(response);
      this.setState({ menuItems: Array.isArray(data) ? data : [] });
    } catch (error) {
      console.error("Error parsing menu data:", error);
      this.setState({ menuItems: [] });
    }
  }

  render() {
    const {menuItems} = this.state;
    return (
      <div className='menubar'>
        <div className='menuheader'>MENU <img src='./menu.png' alt=''/> </div>
        <div className='menulist'>
            <ul>
                {menuItems.map((row)=>(
                  <li onClick={()=>this.props.onMenuClick(row.mid)} >{row.menu} <img src={row.icon} alt=''/></li>

                ))}
                
          </ul>
        </div>
      </div>
    );
  }
}
