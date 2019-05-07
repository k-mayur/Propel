import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Axios from "axios";
import imageExists from "image-exists";
import Dialog from "./Dialog";

const styles = {
  card: {
    width: "30vw",
    maxWidth: 600,
    textAlign: "center",
    marginLeft: "7%"
  },
  media: {
    height: "30vw",
    maxHeight: 600,
    borderRadius: "50%"
  }
};

class MediaCard extends React.Component {
  uploadImage = e => {
    e.preventDefault();
    const imagedata = document.querySelector('input[type="file"]').files[0];

    this.fileUpload(imagedata)
      .then(res => {
        window.location.reload();
      })
      .catch(err => console.log(err));
  };
  fileUpload = file => {
    const url = "http://localhost:4000/api/upload";
    const formData = new FormData();
    formData.append("profileImg", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    return Axios.post(url, formData, config);
  };

  // imageExists(imgUrl, function(exists) {
  //   if (exists) {
  //     return imgUrl;
  //   } else {
  //     return `http://localhost:5500/uploads/profileImg.jpeg`;
  //   }
  // });
  render() {
    let imgUrl = `http://localhost:5500/uploads/profileImg-${
      this.props.id
    }.jpeg`;
    return (
      <Card className={this.props.classes.card}>
        <CardMedia
          className={this.props.classes.media}
          image={imgUrl}
          title="User"
        />
        <Dialog upload={this.uploadImage} />

        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {localStorage.getItem("name")}
          </Typography>
          <Typography component="p">{this.props.userType}</Typography>
        </CardContent>
      </Card>
    );
  }
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
