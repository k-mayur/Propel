import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/login";
import classes from './Dashboard.css'

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
    console.log(user);
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className={classes.assigned}>
            asd
          </div>
          <div className={classes.currentlyWorkingOn}>
            dsa
          </div>
          <div className={classes.completed}>
            sad
          </div>
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
export default connect(mapStateToProps, { logoutUser })(Dashboard);



{/* <div className="col s12 center-align">
  <h4>
    <b>Hey there,</b> {user.name}
    <p className="flow-text grey-text text-darken-1">
      You are logged into a full-stack{" "}
      <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
  </h4>
  <button
    style={{
      width: "150px",
      borderRadius: "3px",
      letterSpacing: "1.5px",
      marginTop: "1rem"
    }}
    onClick={this.onLogoutClick}
    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
  >
    Logout
            </button>
</div> */}
