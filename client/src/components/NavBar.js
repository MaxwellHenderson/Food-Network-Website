import React, {Component} from 'react';
import NewItemPage from './NewItemPage';
import { NavLink } from 'react-router-dom';


class NavBar extends Component {
    render() {
        return (
            <div className="navbar bg-light navbar-expand-md fixed-top top-menu justify-content-between shadow">
                <NavLink to="./">
                    <div className="nav-link" ><a onClick="openApp">Food Network</a></div>
                </NavLink>
                <div className="font-weight-light" onClick = "navToHomePage">Food Network</div>
                <div className="navbar-nav">
                    <div className="collapse navbar-collapse"  id="navbarNav">
                        <NavLink to="/newItem">
                            <div className="nav-link" ><button class="fas fa-plus" onClick="openNewItem"></button></div>
                        </NavLink>
                        <div className="nav-link" ><i className="fas fa-search"></i></div>     
                        <div className="nav-link" ><i className="fas fa-envelope"></i></div>  
                        <div className="nav-link" ><i className="fas fa-user-friends"></i></div>    
                    </div>
                    <div className="nav-link"  data-toggle="collapse" data-target="#sidebar"><i className="fas fa-bars"></i></div>
                </div>
            </div>
        );
    }
}


export default NavBar;

