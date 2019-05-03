import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import { MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { withStyles } from '@material-ui/core/styles';



function PaperComponent(props) {
    return (
        <Draggable>
            <Paper {...props} />
        </Draggable>
    );
}

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

class DraggableDialog extends React.Component {
    state = {
        open: false,
        data: [],
        name:''
    };

    handleClickOpen = async (e) => {
        console.log(e.target)
        await axios
            .get(`http://localhost:4000/api/userTasks/${e.target.value[0]}`)
            .then(res => {
                console.log(res)
                this.setState({ open: true, data: res.data.tasks ,name:e.target.value[1] });
            })
            .catch(err => console.log(err));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    filteredData = (val) => {
        let data = this.state.data.filter(ele => ele.status === val)
        console.log(data)
        return (
            <div>
                {data.map(ele => <div>{ele.task}</div>)}
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className="select" autoComplete="off">
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="demo-controlled-open-select">Trainee</InputLabel>
                        <Select
                            onChange={this.handleClickOpen}
                            inputProps={{
                                id: 'demo-controlled-open-select',
                            }}
                        >
                            {this.props.data.map(ele => <MenuItem value={[ele.id,ele.name]}>{ele.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </form>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle id="draggable-dialog-title" >{this.state.name} Tasks</DialogTitle>
                    <DialogContent>
                        <div style={{ display: 'flex', justifyContent: 'space-between'}} >
                            <div style={{ width: '200px' }}>{this.filteredData("NYS")}</div>
                            <div style={{ width: '200px' }}>{this.filteredData("CWO")}</div>
                            <div style={{ width: '200px' }}>{this.filteredData("COM")}</div>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(DraggableDialog);
