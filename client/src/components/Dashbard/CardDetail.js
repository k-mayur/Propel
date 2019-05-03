import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "40vw",
    padding: 40,
    margin: 5
  },
  title: {
    fontSize: 30
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
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Propel Team
        </Typography>
        <Typography
          className={classes.about}
          color="textSecondary"
          gutterBottom
        >
          Name : {jsUcfirst(props.name)}
        </Typography>
        <Typography
          className={classes.about}
          color="textSecondary"
          gutterBottom
        >
          Role : {jsUcfirst(props.userType)}
        </Typography>
        <Typography variant="h3" component="h2" />
        <Typography
          className={classes.about}
          color="textSecondary"
          gutterBottom
        >
          About Me:
        </Typography>
        <Typography className={classes.text} color="textSecondary" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
