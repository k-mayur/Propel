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
          {jsUcfirst(props.name)}, {jsUcfirst(props.userType)}
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
          I am a dedicated person with a family of four. I enjoy reading, and
          the knowledge and perspective that my reading gives me has
          strengthened my teaching skills and presentation abilities. I have
          been successful at raising a family, and I attribute this success to
          my ability to plan, schedule, and handle many different tasks at once.
          This flexibility will help me in the classroom, where there are many
          different personalities and learning styles.
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleCard);
