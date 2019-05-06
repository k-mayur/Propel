import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Edit from "./Edit";

const styles = {
  card: {
    width: "40vw",
    padding: 40,
    marginRight: "7%"
  },
  title: {
    fontSize: 30,
    color: "#007bff"
  },
  about: {
    fontSize: 25
  },
  text: {
    fontSize: 20
  }
};

function jsUcfirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function SimpleCard(props) {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <Edit />
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
          style={{ fontWeight: "bold" }}
        >
          Propel Team
        </Typography>
        <Typography
          className={classes.about}
          color="textSecondary"
          gutterBottom
          style={{ color: "#202020" }}
        >
          {localStorage.getItem("name")}, {jsUcfirst(props.userType)}
        </Typography>
        <Typography variant="h3" component="h2" />
        <Typography
          className={classes.about}
          color="textSecondary"
          gutterBottom
        >
          About Me:
        </Typography>
        <Typography
          className={classes.text}
          color="textSecondary"
          style={{ color: "#202020" }}
          gutterBottom
        >
          {localStorage.getItem("about")}
        </Typography>
        <Typography
          className={classes.text}
          style={{ color: "#007bff", marginTop: "50px", textAlign: "right" }}
          gutterBottom
        >
          Joined {moment(new Date(props.date)).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
