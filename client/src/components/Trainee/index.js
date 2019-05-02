import React, { Component } from "react";
import styled from "styled-components";
import Draggable from "./draggable/index";
import Droppable from "./droppable/index";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const Item = styled.div`
  padding: 8px;
  color: #555;
  background-color: white;
  border-radius: 3px;
`;
const Time = styled.div`
  width: 40px;
  border-radius: 3px;
  float: right;
  color: white;
  font-weight: bold;
`;

const droppableStyle = {
  width: "30%",
  backgroundColor: "#D3D3D3",
  borderRadius: "5px",
  alignSelf: "flex-start",
  minHeight: "100px"
};
const styles = {
  title: {
    fontSize: 18
  },
  NYS: {
    backgroundColor: "OrangeRed"
  },
  CWO: {
    backgroundColor: "RoyalBlue"
  },
  COM: {
    backgroundColor: "SeaGreen"
  }
};
class DndTest extends Component {
  populateTasks = (tasks, status) => {
    console.log(tasks);
    let filteredData = tasks.reduce((acc, ele, index) => {
      if (ele.status === status) {
        ele.id = index.toString();
        acc.push(ele);
      }
      return acc;
    }, []);
    // console.log(filteredData)
    return (
      <div id="listItem">
        {filteredData.map(ele => (
          <Draggable id={ele.id} key={ele.id} style={{ margin: "8px" }}>
            <Item>
              <Time className={this.props.classes[status]}>
                {" "}
                &nbsp;{new Date(ele.dueDate).getDate()}/
                {new Date(ele.dueDate).getMonth() + 1}&nbsp;
              </Time>
              {/* <br/> */}
              {ele.task}
              {/* <ErrorIcon /> */}
            </Item>
            {/* <ErrorIcon className={ele.state === 'NYS' ? classes.openIcon : classes.closeIcon} /> */}
          </Draggable>
        ))}
      </div>
      // <div></div>
    );
  };

  render() {
    const classes = this.props.classes;
    let tasks = this.props.user.tasks;
    return (
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <Droppable id="NYS" style={droppableStyle}>
          <Typography className={classes.title}> &nbsp;Todo</Typography>
          {this.populateTasks(tasks, "NYS")}
        </Droppable>
        <Droppable id="CWO" style={droppableStyle}>
          <Typography className={classes.title}>&nbsp;Working</Typography>
          {this.populateTasks(tasks, "CWO")}
        </Droppable>
        <Droppable id="COM" style={droppableStyle}>
          <Typography className={classes.title}> &nbsp;Done</Typography>
          {this.populateTasks(tasks, "COM")}
        </Droppable>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.login.user
});
export default connect(
  mapStateToProps,
  {}
)(withStyles(styles)(DndTest));
