"use strict";
import React, {Component} from 'react';

class SideBar extends Component {

    render() {
        return (
            <div id="sidebar" class="sidebar" style={{width: '230px', 'margin-top': '0px', 'background-color':'#393D3F', height: '94vh', position: 'fixed', right: '0px'}}>
                <div id="sidebar-header" class="py-3" style={{color: 'white', height: '130px', 'background-color': '#282A2C'}} >
                    <div id="user_info" class="row ml-0 mr-0">
                        <img src="imgs/profile_default.jpg" class="rounded-circle ml-2 my-1 column" style={{height: '40px'}} alt="profile picture"/>
                        <div class="column" id="" style={{'font-size': '16px'}}>
                            <div id="username" class="row ml-3 mr-0">GermanSausageMan</div>
                            <div  id="location" class="row ml-3 mr-0" style={{'font-size': '14px'}}>
                                <i class="fas fa-map-marker-alt"></i>
                                <div class="ml-2">Seattle, WA</div>
                            </div>
                        </div>
                    </div>
                    <hr class="mt-3 mb-0" style={{'background-color': '#D8D8D8', 'opacity': '15%'}} />
                    <div id="tabs" class="row mx-0" style={{'margin-top': 'auto', height: '51%'}} >
                        <div class="column px-3 mr-1 border-right pt-2">
                            <i class="fas fa-sign-out-alt mt-2 mx-2"></i>
                        </div>
                        <div class="column pl-2 mr-1 pr-3 pt-2 border-right" style={{'font-size': '12px'}}>
                            <div>Followers</div>
                            <div>210</div>
                        </div>
                        <div class="column pl-2 pt-2" style={{'font-size': '12px'}}>
                            <div>Following</div>
                            <div>200</div>
                        </div>
                    </div>
                </div>
                <div id="sidebar-list" class="container px-0" style={{color: 'white'}}>
                    <div class="text-center font-weight-bold mt-2 py-1">My Listings</div>
                    
                    <hr class="mt-2 mb-0" style={{'background-color': '#D8D8D8', opacity: '15%'}} />
                    <div class="pl-3 pt-1 ml-2">Pending</div>
                    <div class="row mx-0">
                        <div class="column ml-3">
                            <img src="imgs/makisushi.jpg" style={{width:'115px',height:'115px'}} alt="good sushi" />
                        </div>
                        <div class="column pl-2">
                            <div>Sushi</div>
                            <div class="font-weight-bold">$4.25</div>
                        </div>
                    </div>
                   
                    <hr class="mt-3 mb-0" style={{'background-color': '#D8D8D8', opacity: '15%'}} />
                    <div class="pl-3 pt-1 ml-2">Current Listings</div> 
                    <div class="row mx-0">
                        <div class="column ml-3">
                            <img src="imgs/itsapizza.jpg" style={{width:'115px',height:'115px'}} alt="good sushi" />
                        </div>
                        <div class="column pl-2">
                            <div>Not Sushi</div>
                            <div class="font-weight-bold">$8.25</div>
                        </div>
                    </div>
                  
                    <hr class="mt-3 mb-0" style={{'background-color': '#D8D8D8', opacity: '15%'}} />
                    <div class="pl-3 pt-1 ml-2">History</div>  
                    <div class="row mx-0">
                        <div class="column ml-3">
                            <img src="imgs/lasagna.jpg" style={{width:'115px',height:'115px'}} alt="good sushi" />
                        </div>
                        <div class="column pl-2">
                            <div>Lasagna</div>
                            <div class="font-weight-bold">$4.20</div>
                        </div>
                    </div>
                    <div id="sidebar-buttons" class="row mx-0 border-top" style={{'font-size': '28px', position: 'absolute', bottom: 0}} >
                        <div class="column px-4 py-2 border-right">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="column px-4 py-2 border-right" >
                            <i class="far fa-grin-beam-sweat"></i>
                        </div>
                        <div class="column px-4 py-2" >
                            <i class="fas fa-cog"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SideBar;