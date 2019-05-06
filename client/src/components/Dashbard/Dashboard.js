import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classes from "./Dashboard.css";
import Card from "./Card";
import CardDetail from "./CardDetail";

class Dashboard extends Component {
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
          <CardDetail
            name={user.name}
            userType={user.userType}
            date={user.createDate}
            about={user.about}
          />
        </div>
      </div>
    );
  }
}
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.login
});
export default connect(mapStateToProps)(Dashboard);
