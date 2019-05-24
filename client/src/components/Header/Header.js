import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { connect } from "react-redux";
import { logoutUser } from "../../store/actions/login";

const styles = {
  root: {
    flexGrow: 0
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Header extends React.Component {
  state = {
    anchorEl: null
  };

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.setState({ anchorEl: null });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const auth = this.props.auth.isAuthenticated;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    let homeUrl = "/";
    if (auth) {
      if (this.props.auth.user.userType === "MENTOR") {
        homeUrl = "/mentor";
      }
      if (this.props.auth.user.userType === "TRAINEE") {
        homeUrl = "/trainee";
      }
    }

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link
                style={{ color: "white", textDecoration: "none" }}
                to={homeUrl}
              >
                ✈ PropelMeAhead ✈
                {/* <img src={require("./logo.png")} alt="logo" /> */}
              </Link>
            </Typography>
            <div>{localStorage.getItem("name")}</div>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? "menu-appbar" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <Link
                    style={{
                      textDecoration: "none",
                      color: "#202020"
                    }}
                    to="/dashboard"
                  >
                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  </Link>{" "}
                  <MenuItem onClick={this.onLogoutClick}>Log out</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.login
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(withStyles(styles)(Header));
