import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from './draggable/index'
import Droppable from './droppable/index'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fetchTasks, updateTasks, addTasks, deleteTask } from '../../store/actions/trainee'
import PropTypes from 'prop-types';
import FormDialog from './addTask/addTask'
import Button from '@material-ui/core/Button';
import moment from 'moment';

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

const droppableStyle = {
    width: "30%",
    backgroundColor: '#D3D3D3',
    borderRadius: "5px",
    minHeight: '250px'
}
const styles = theme=>({
    title: { fontSize: 18, },
    NYS: { backgroundColor: "OrangeRed" },
    CWO: { backgroundColor: "RoyalBlue" },
    COM: { backgroundColor: "SeaGreen" },
    container: {
        display: 'flex',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    input: {
        display: 'none',
    },
})
class DndTest extends Component {
    changeStatus = (taskId, status) => {
        this.props.updateTasks({ taskId: taskId, status: status })
    }

    addNewTask =(task,dueDate) =>{
        this.props.addTasks({ task, dueDate})
    }
    deleteTask=(e)=>{
        if(e.target.id!=="")this.props.deleteTask({taskId:e.target.id,traineeId:this.props.user.id})
        else {
            this.props.deleteTask(e.target.parentNode.id)
        }
    }
    componentDidMount = () => {
        this.props.fetchTasks(this.props.user.id);
    }
    deleteButton =(task)=>{
        if(this.props.user.name===task.assignedBy)
            return (
                <div className="user" style={{display:'flex',justifyContent:'space-between'}}>
                    <div className="userDiv" style={{ fontWeight: 'bold' }}>Assigned by own</div>
                    <Button id={task.id} className="userDiv" onClick={this.deleteTask} aria-label="Delete">
                        del
                    </Button>
                </div>
        )
        else {
            return (
                <div className="mentor" style={{fontWeight:'bold'}}>Assigned by {task.assignedBy.toLowerCase()}</div>
            )
        }
    }
    populateTasks = (tasks, status) => {
        let filteredData = tasks.reduce((acc, ele, index) => {
            if (ele.status === status) {
                acc.push(ele);
            }
            return acc;
        }, []);
        return (
            <div id={status}>{filteredData.map((ele) =>
                <Draggable id={ele.id} key={ele.id} style={{ margin: '8px' }} >
                    <Item className="item" style={{ whiteSpace: 'pre-line' }}>
                        <Time className={this.props.classes[status]}>{new Date(ele.dueDate).getDate()}/{new Date(ele.dueDate).getMonth() + 1}&nbsp;</Time>
                        {ele.task}
                        <br />
                        <br />
                        {this.deleteButton(ele)}
                    </Item>
                </Draggable>)}
            </div>
        )
    }

    render() {
        const { classes } = this.props;
        let tasks = this.props.tasks;
        return (
            <div style={{margin:'30px'}}>
                
                <div style={{ margin: "30px" }} >
                    <FormDialog addNewTask={this.addNewTask} />
                </div>
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
            </div>

        )
    }
}

DndTest.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    user: state.login.user,
    tasks: state.tasks.tasks
});
export default connect(mapStateToProps, { fetchTasks, updateTasks, addTasks, deleteTask})(withStyles(styles)(DndTest));

