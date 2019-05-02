import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/login";
import classes from "./Dashboard.css";
import Card from "./Card";
import CardDetail from "./CardDetail";

class Dashboard extends Component {
  // state={
  //   errors: {},
  //   userType: ""
  // }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({
  //       errors: nextProps.errors
  //     });
  //   }
  //   if (nextProps.userType) {
  //     this.setState({userType:nextProps.userType})
  //   }
  // }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div className={classes.wrap}>
        <Card name={user.name} userType={user.userType} />
        <CardDetail name={user.name} userType={user.userType} />
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
