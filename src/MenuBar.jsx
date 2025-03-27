import React, { Component } from 'react'
import './MenuBar.css';
import { BASEURL, callApi, getSession } from './api';

export default class MenuBar extends Component {
  constructor(){
    super();
    this.state={menuItems:[]};
    this.loadMenus =this.loadMenus.bind(this);
  }
  componentDidMount()
  {
    let csr =getSession("csrid");
    let data =JSON.stringify({csrid: csr});
    callApi("POST",BASEURL + "menus/getmenusbyrole",data,this.loadMenus);

    //callApi("POST",BASEURL +"menus/getmenus","",this.loadMenus);
  }
  loadMenus(response)
  {
    let data =JSON.parse(response);
    this.setState({menuItems:data})
  }
  render() {
    const{menuItems} = this.state;
    
    
    return (
      <div className='menubar'>
        <div className='menuheader'>Menu<img src='public/menu.png'/></div>
        <div className='menulist'>
            <ul>
                {menuItems.map((row)=>(
                  <li>{row.menu}<img src={row.icon}/></li>
                ))}
            </ul>
        </div>
      </div>
    )
  }
}
