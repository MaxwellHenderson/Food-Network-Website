"use strict";

import React, {Component} from 'react';


class NavBar extends Component {
    render() {
        return (
            <div className="navbar bg-light navbar-expand-md fixed-top top-menu justify-content-between shadow">
                <div className="font-weight-light">Food Network</div>
                <div className="navbar-nav">
                    <div className="collapse navbar-collapse"  id="navbarNav">
                        <a className="nav-link" href=""><i className="fas fa-search"></i></a>     
                        <a className="nav-link" href=""><i className="fas fa-envelope"></i></a>  
                        <a className="nav-link" href=""><i className="fas fa-user-friends"></i></a>    
                    </div>
                    <a className="nav-link" href="" data-toggle="collapse"data-target="#sidebar"><i className="fas fa-bars"></i></a>
                </div>
            </div>
        );
    }
}


export default NavBar;

