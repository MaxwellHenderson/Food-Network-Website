import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

var email = localStorage.getItem("email");
var profileLink = "/profile"+email;

class NavBar extends Component {
    
    render() {
        return (
            <div className="navbar bg-light navbar-expand-md fixed-top top-menu justify-content-between shadow">
                <NavLink to="./">
                    <div className="nav-link" >Food Network</div>
                </NavLink>
                <div className="navbar-nav">
                    <div className="collapse navbar-collapse"  id="navbarNav">
                        <NavLink to="/newItem">
                            <div className="nav-link"><div className="fas fa-plus"></div></div>
                        </NavLink>
                        <div className="nav-link" data-toggle="collapse" data-target="#searchbar" aria-expanded="false">
                            <i className="fas fa-search"></i>
                        </div>     
                        <div className="nav-link" ><i className="fas fa-envelope"></i></div>  
                        <NavLink to={{
                            pathname: `/profile/${this.email}`
                            }}>
                            <div className="nav-link" ><i className="fas fa-user-friends"></i></div>    
                        </NavLink>
                    </div>
                    <div className="nav-link" data-toggle="collapse" data-target="#sidebar" aria-expanded="false">
                        <i className="fas fa-bars"></i>
                    </div>
                </div>
            </div>
        );
    }
}


export default NavBar;

