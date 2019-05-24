import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class ControlledOpenSelect extends React.Component {
  state = {
    option: '',
    statusArray:[],
    open: false,
  };

  handleChange = e => {
    this.props.changeStatus(e.target.name,e.target.value)
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleOpen = () => {
    let statusCodes = ["NYS", "CWO", "COM"];
    statusCodes = statusCodes.filter(ele => ele !== this.props.status)
    this.setState({ open: true, statusArray: statusCodes });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className="select" autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="demo-controlled-open-select">Move Task</InputLabel>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            value={this.state.option}
            onChange={this.handleChange}
            inputProps={{
              name: this.props.id,
              id: 'demo-controlled-open-select',
            }}
          >
            <MenuItem value={''}></MenuItem>
            <MenuItem value={this.state.statusArray[0]}>{this.state.statusArray[0]}</MenuItem>
            <MenuItem value={this.state.statusArray[1]}>{this.state.statusArray[1]}</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}

ControlledOpenSelect.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledOpenSelect);
