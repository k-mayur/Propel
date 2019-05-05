import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Select from "@material-ui/core/Select";
import FormControl from '@material-ui/core/FormControl';
import axios from "axios";
import { MenuItem } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import styled from 'styled-components'


const styles = theme => ({
    title: { fontSize: 18, },
    NYS: { backgroundColor: "OrangeRed" },
    CWO: { backgroundColor: "RoyalBlue" },
    COM: { backgroundColor: "SeaGreen" },
    container: {
        display: 'flex',
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
    button: {
        display: 'block',
        marginTop: theme.spacing.unit * 2,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
})

const droppableStyle = {
    width: "30%",
    backgroundColor: '#D3D3D3',
    borderRadius: "5px",
    minHeight: '250px'
}

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
  margin:3px;
`;
const Time = styled.div`
    width:50px;
    display:flex;
    justify-content:center;
    border-radius:3px;
    float:right;
    color:white;
    font-weight:bold;
;`

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class FullScreenDialog extends React.Component {
    state = {
        open: false,
        data: [],
        name: '',
        traineeid:''
    };

    handleClickOpen = async (e) => {
        await axios
            .get(`http://localhost:4000/api/userTasks/${e.target.value[0]}`)
            .then(res => {
                this.setState({ open: true, data: res.data.tasks, name: e.target.value[1] ,traineeid:e.target.value[0]});
            })
            .catch(err => console.log(err));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteTask = (taskId) => {
        axios
            .put(`http://localhost:4000/api/userTasks/mentor/delete`, { taskId: taskId, traineeId: this.state.traineeid })
            .then(res => {
                let deleteData = this.state.data.filter(ele => ele.id !== taskId)
                this.setState({data:deleteData})
            })
            .catch(err => console.log(err));
    }

    deleteButton = (task) => {
            return (
                <div className="user" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="userDiv" style={{ fontWeight: 'bold' }}>Assigned by {task.assignedBy.toLowerCase()}</div>
                    <Button id={task.id} className="userDiv" onClick={() => this.deleteTask(task.id)} aria-label="Delete">
                        del
                    </Button>
                </div>
            )
    }

    filteredData = (val) => {
        let data = this.state.data.filter(ele => ele.status === val)
        return (
            <div id={val}>{data.map((ele) =>
                <Item className="item" style={{ whiteSpace: 'pre-line' }}>
                    <Time className={this.props.classes[val]}>{new Date(ele.dueDate).getDate()}/{new Date(ele.dueDate).getMonth() + 1}&nbsp;</Time>
                    {ele.task}
                    <br />
                    <br />
                    {this.deleteButton(ele)}
                </Item>
            )}
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <form className="select" autoComplete="off" style={{marginTop:'2em',marginBottom:'2em',width:'350px'}}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="demo-controlled-open-select">Check Trainee Status</InputLabel>
                        <Select
                            onChange={this.handleClickOpen}
                            inputProps={{
                                id: 'demo-controlled-open-select',
                            }}
                            style={{width:"300px"}}
                        >
                            {this.props.data.map(ele => <MenuItem value={[ele.id, ele.name]}>{ele.name}</MenuItem>)}
                        </Select>
                    </FormControl>
                </form>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onClose={this.handleClose}
                    TransitionComponent={Transition}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" color="inherit" onClick={this.handleClose} className={classes.flex}>
                                {this.state.name}
                            </Typography>
                            
                        </Toolbar>
                    </AppBar>

                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '2em'}}>
                        <div style={droppableStyle}>
                            <Typography className={classes.title} > &nbsp;Todo</Typography>
                            {this.filteredData("NYS")}
                        </div>
                        <div style={droppableStyle}>
                            <Typography className={classes.title} > &nbsp;Working</Typography>
                            {this.filteredData("CWO")}
                        </div>
                        <div style={droppableStyle}>
                            <Typography className={classes.title} > &nbsp;Completed</Typography>
                            {this.filteredData("COM")}
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

FullScreenDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FullScreenDialog);
