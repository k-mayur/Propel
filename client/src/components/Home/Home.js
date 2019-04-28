import React from "react";

class Login extends React.Component {
  render() {
    return (
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s12 center-align">
            <h4>
              <b>Join</b>
              &nbsp;&nbsp;
              <span style={{ color: "blue" }}>PROPEL-SCHOOL</span>
              &nbsp; today!
            </h4>
            <p className="flow-text grey-text text-darken-1">
              A MountBlue Technology Career Booster Program
            </p>
            <br />
            <a
              href="/register"
              style={{
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Register
            </a>
            <a
              href="/login"
              style={{
                marginLeft: "2rem",
                width: "150px",
                borderRadius: "3px",
                letterSpacing: "1.5px"
              }}
              className="btn btn-large waves-effect white hoverable black-text"
            >
              Log In
            </a>
          </div>
        </div>
      </div>
    );
  }

  // render() {
  //   return (
  //     <div>
  //       {this.state.data.name}
  //       <Link to="/login">login</Link>
  //       <Link to="/register">register</Link>
  //     </div>
  //   );
  // }
}

export default Login;
