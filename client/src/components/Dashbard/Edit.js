import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUser, setCurrentUser } from "../../store/actions/login";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

class CustomizedDialogDemo extends React.Component {
  state = {
    open: false,
    name: localStorage.getItem("name"),
    about: localStorage.getItem("about")
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  editHandler = e => {
    e.preventDefault();
    const formData = new FormData(document.getElementById("editForm"));
    const data = {
      about: formData.get("about"),
      name: formData.get("name")
    };
    Axios.put(`http://localhost:4000/api/userTasks/user/edit`, data)
      .then(res => {
        this.props.editUser(res);
        this.setState({ name: res.name, about: res.about });
      })
      .then(res => window.location.reload())
      .catch(err => console.log(err));
  };

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div
        style={{
          position: "relative"
        }}
      >
        <span
          onClick={this.handleClickOpen}
          style={{
            backgroundColor: "#202020",
            color: "white",
            padding: "3px",
            borderRadius: "3px",
            position: "absolute",
            right: "-30px",
            bottom: "2px",
            cursor: "pointer"
          }}
        >
          <i class="material-icons" style={{ fontSize: ".8em" }}>
            &#xe22b;
          </i>
        </span>
        <Dialog
          onClose={this.handleClose}
          aria-labelledby="customized-dialog-title"
          open={this.state.open}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Edit Profile
          </DialogTitle>
          <DialogContent>
            <div>
              <form action="" id="editForm" onSubmit={this.editHandler}>
                Name :
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                />
                About Me :
                <textarea
                  name="about"
                  className="materialize-textarea"
                  value={this.state.about}
                  onChange={this.onChange}
                />
                <input type="submit" name="submit" className="btn" />
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

CustomizedDialogDemo.propTypes = {
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.login
});
export default connect(
  mapStateToProps,
  { editUser, setCurrentUser }
)(CustomizedDialogDemo);
