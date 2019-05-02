import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from './draggable/index'
import { Droppable, taskId, taskStatus } from './droppable/index'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ErrorIcon from '@material-ui/icons/ErrorOutline'
import moment from 'moment'
// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchTasks, updateTasks } from '../../store/actions/trainee'


const Item = styled.div`
    padding:8px;
    color:#555;
    background-color:white;
    border-radius:3px;
;`
const Time = styled.div`
    width:50px;
    display:flex;
    justify-content:center;
    border-radius:3px;
    float:right;
    color:white;
    font-weight:bold;
;`

const droppableStyle = {
    width: "30%",
    backgroundColor: '#D3D3D3',
    borderRadius: "5px",
    alignSelf: "flex-start",
    minHeight: '250px'
}
const styles = {
    title: { fontSize: 18, },
    NYS: { backgroundColor: "OrangeRed" },
    CWO: { backgroundColor: "RoyalBlue" },
    COM: { backgroundColor: "SeaGreen" }

};
class DndTest extends Component {
    changeStatus = (taskId, status) => {
        this.props.updateTasks({ taskId: taskId, status: status, traineeId: this.props.user.id })
    }

    componentDidMount = () => {
        this.props.fetchTasks(this.props.user.id);
    }
    populateTasks = (tasks, status) => {
        // console.log(tasks)
        let filteredData = tasks.reduce((acc, ele, index) => {
            if (ele.status === status) {
                acc.push(ele);
            }
            return acc;
        }, []);
        // console.log(filteredData)
        return (
            <div id={status}>{filteredData.map((ele) =>
                <Draggable id={ele.id} key={ele.id} style={{ margin: '8px' }}>
                    <Item>
                        <Time className={this.props.classes[status]}> &nbsp;{new Date(ele.dueDate).getDate()}/{new Date(ele.dueDate).getMonth() + 1}&nbsp;</Time>
                        {/* <br/> */}
                        {ele.task}
                        {/* <ErrorIcon /> */}
                    </Item>
                    {/* <ErrorIcon className={ele.state === 'NYS' ? classes.openIcon : classes.closeIcon} /> */}
                </Draggable>)}
            </div>
            // <div></div>
        )
    }

    render() {
        console.log()
        const classes = this.props.classes;
        let tasks = this.props.tasks;
        // console.log(this.props.user)
        return (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Droppable id='NYS' style={droppableStyle} changeStatus={this.changeStatus}>
                    <Typography className={classes.title} > &nbsp;Todo</Typography>
                    {this.populateTasks(tasks, 'NYS')}
                </Droppable>
                <Droppable id='CWO' style={droppableStyle} changeStatus={this.changeStatus}>
                    <Typography className={classes.title} >&nbsp;Working</Typography>
                    {this.populateTasks(tasks, 'CWO')}
                </Droppable>
                <Droppable id='COM' style={droppableStyle} changeStatus={this.changeStatus}>
                    <Typography className={classes.title}> &nbsp;Done</Typography>
                    {this.populateTasks(tasks, 'COM')}
                </Droppable>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user,
    tasks: state.tasks.tasks
});
export default connect(mapStateToProps, { fetchTasks, updateTasks })(withStyles(styles)(DndTest));

