import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from './draggable/index'
import Droppable from './droppable/index'
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { fetchTasks, updateTasks } from '../../store/actions/trainee'


const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
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
        return (
            <div id={status}>{filteredData.map((ele) =>
                <Draggable id={ele.id} key={ele.id} style={{ margin: '8px' }}>
                    <Item>
                        <Time className={this.props.classes[status]}> &nbsp;{new Date(ele.dueDate).getDate()}/{new Date(ele.dueDate).getMonth() + 1}&nbsp;</Time>
                        {ele.task}
                    </Item>
                </Draggable>)}
            </div>
        )
    }

    render() {
        console.log()
        const classes = this.props.classes;
        let tasks = this.props.tasks;
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

