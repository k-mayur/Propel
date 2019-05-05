import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/login";
import classes from "./Dashboard.css";
import Card from "./Card";
import CardDetail from "./CardDetail";

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div className={classes.wrap}>
          <Card
            name={user.name}
            userType={user.userType}
            id={user.id}
            upload={this.uploadImage}
          />
          <CardDetail name={user.name} userType={user.userType} id={user.id} />
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.login
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
