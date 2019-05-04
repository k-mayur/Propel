import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/login";
import classes from "./Dashboard.css";
import Card from "./Card";
import CardDetail from "./CardDetail";
import Axios from "axios";
import ReactAux from "../../hoc/ReactAux";

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
  uploadImage = e => {
    e.preventDefault();
    const imagedata = document.querySelector('input[type="file"]').files[0];
    console.log(imagedata);
    this.fileUpload(imagedata)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };
  fileUpload = file => {
    const url = "http://localhost:4000/api/upload";
    const formData = new FormData();
    formData.append("profileImg", file);
    console.log(formData.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return Axios.post(url, formData, config);
  };

  componentDidMount = () => {};

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <div>
          <form action="">
            <input type="file" name="profileImg" />
            <input type="button" value="upload" onClick={this.uploadImage} />
          </form>
        </div>
        <div className={classes.wrap}>
          <Card name={user.name} userType={user.userType} />
          <CardDetail name={user.name} userType={user.userType} />
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
