import React, {Component} from 'react';


class NavBar extends Component {
    render() {
        return (
            <div className="navbar bg-light navbar-expand-md fixed-top top-menu justify-content-between shadow">
                <div className="font-weight-light">Food Network</div>
                <div className="navbar-nav">
                    <div className="collapse navbar-collapse"  id="navbarNav">
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

