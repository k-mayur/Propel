import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "30vw",
    maxWidth: 600,
    textAlign: "center",
    margin: 5
  },
  media: {
    height: "30vw",
    maxHeight: 600
  }
};

function MediaCard(props) {
  const { classes } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image="http://localhost:5500/uploads/profileImg-5cc84fd874fda657ee85993a.jpeg"
        title="User"
      />

      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography component="p">{props.userType}</Typography>
      </CardContent>
    </Card>
  );
}

MediaCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MediaCard);
