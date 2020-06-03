import React, { Component } from "react";

class SideBar extends Component {
  render() {
    const { user, userListings } = this.props;
    return (
      <div
        id="sidebar"
        className="sidebar collapse"
        style={{
          width: "230px",
          marginTop: "0px",
          backgroundColor: "#393D3F",
          height: "95vh",
          position: "fixed",
          right: "0px",
        }}
      >
        <div
          id="sidebar-header"
          className="py-3"
          style={{ color: "white", height: "130px", backgroundColor: "#282A2C" }}
        >
          <div id="user_info" className="row ml-0 mr-0">
            <img
              src="imgs/profile_default.jpg"
              className="rounded-circle ml-2 my-1 column"
              style={{ height: "40px" }}
              alt="profile"
            />
            <div className="column" id="" style={{ fontSize: "16px" }}>
              <div id="username" className="row ml-3 mr-0">
                {user.displayname}
              </div>
              <div id="location" className="row ml-3 mr-0" style={{ fontSize: "14px" }}>
                <i className="fas fa-map-marker-alt"></i>
                <div className="ml-2">{user.city}</div>
              </div>
            </div>
          </div>
          <hr className="mt-3 mb-0" style={{ backgroundColor: "#D8D8D8", opacity: "15%" }} />
          <div id="tabs" className="row mx-0" style={{ marginTop: "auto", height: "51%" }}>
            <div className="column px-3 mr-1 border-right pt-2">
              <i className="fas fa-sign-out-alt mt-2 mx-2"></i>
            </div>
            <div className="column pl-2 mr-1 pr-3 pt-2 border-right" style={{ fontSize: "12px" }}>
              <div>Followers</div>
              <div>210</div>
            </div>
            <div className="column pl-2 pt-2" style={{ fontSize: "12px" }}>
              <div>Following</div>
              <div>200</div>
            </div>
          </div>
        </div>
        <div id="sidebar-list" className="container px-0 listings" style={{ color: "white" }}>
          <div className="text-center font-weight-bold mt-2 py-1">My Listings</div>

          <hr className="mt-2 mb-0" style={{ backgroundColor: "#D8D8D8", opacity: "15%" }} />

          <div className="pl-3 pt-1 ml-2">Pending</div>
          {userListings.pending.length ? (
            <div className="row mx-0">
              <div className="column ml-3">
                <img
                  src={userListings.pending[0].mealImagePath}
                  style={{ width: "115px", height: "115px" }}
                  alt="pending listing"
                />
              </div>
              <div className="column pl-2">
                <div>{userListings.pending[0].mealName}</div>
                <div className="font-weight-bold">${userListings.pending[0].mealPrice}</div>
              </div>
            </div>
          ) : (
            ""
          )}

          <hr className="mt-3 mb-0" style={{ backgroundColor: "#D8D8D8", opacity: "15%" }} />
          <div className="pl-3 pt-1 ml-2">Current Listings</div>
          {userListings.active.length ? (
            <div className="row mx-0">
              <div className="column ml-3">
                <img
                  src={userListings.active[0].mealImagePath}
                  style={{ width: "115px", height: "115px" }}
                  alt="active listing"
                />
              </div>
              <div className="column pl-2">
                <div>{userListings.active[0].mealName}</div>
                <div className="font-weight-bold">${userListings.active[0].mealPrice}</div>
              </div>
            </div>
          ) : (
            ""
          )}

          <hr className="mt-3 mb-0" style={{ backgroundColor: "#D8D8D8", opacity: "15%" }} />
          <div className="pl-3 pt-1 ml-2">History</div>
          {userListings.sold.length ? (
            <div className="row mx-0">
              <div className="column ml-3">
                <img
                  src={userListings.sold[0].mealImagePath}
                  style={{ width: "115px", height: "115px" }}
                  alt="sold listing"
                />
              </div>
              <div className="column pl-2">
                <div>{userListings.sold[0].mealName}</div>
                <div className="font-weight-bold">${userListings.sold[0].mealPrice}</div>
              </div>
            </div>
          ) : (
            ""
          )}

          <div
            id="sidebar-buttons"
            className="row mx-0 border-top"
            style={{ fontSize: "28px", position: "absolute", bottom: 0 }}
          >
            <div className="column px-4 py-2 border-right">
              <i className="fas fa-plus"></i>
            </div>
            <div className="column px-4 py-2 border-right">
              <i className="far fa-grin-beam-sweat"></i>
            </div>
            <div className="column px-4 py-2">
              <i className="fas fa-cog"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SideBar;
