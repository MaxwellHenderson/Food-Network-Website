import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

// TODO: Make modal more responsive/robust for inputs 

class ListingModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let meal = this.props.meal;

        return(
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content" style={{'backgroundImage':  'url(' + meal.mealImagePath + ')', 'backgroundSize': '120%'}}>
                        <div className="modal-body text-white px-0 py-0 w-100" style={{height: '500px', width: '500px'}} >
                            <div className="modal-text mx-0 pl-3 pt-3 row d-flex align-content-between">
                                <div className="col-6">
                                    <div id="modal-name" className="font-weight-light mb-1" style={{'fontSize': "20px"}}>
                                        {meal.mealName}
                                    </div>
                                    <div id="modal-location" className="row mx-0">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <div className="row mx-0">
                                        <div className="ml-2">Seattle, WA</div> <div className="ml-2">0.8 miles</div>
                                        </div>
                                    </div>
                                    <div id="modal-price" className="font-weight-bold">
                                        Price: ${meal.mealPrice}
                                    </div>
                                    </div>
                                    <div className="col-6 text-right">
                                    <div className="mb-2">
                                        Description: {meal.mealDescription}
                                    </div>
                                    <NavLink to="/listing">
                                        <button className="btn btn-info" data-toggle="modal" data-target="#exampleModalCenter">
                                            View Listing
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default ListingModal;