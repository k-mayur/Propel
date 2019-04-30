import React, { Component } from 'react'
import styled from 'styled-components'
import Draggable from '../draggable/index'
import Droppable from '../droppable/index'
import { connect } from "react-redux";

const Wrapper = styled.div`
width:100%;
padding:32px;
display:flex;
justify-content:center;
`;

const Item = styled.div`
    padding:8px;
    color:#555;
    background-color:white;
    border-radius:3px;
;`

const droppableStyle = {
    backgroundColor: '#555',
    minWidth: '250px',
    height: '400px',
    margin: '32px',
}
class DndTest extends Component {
    populateTasks = (tasks,status) => {
        let filteredData = tasks.reduce((acc,ele,index) => {
            if(ele.status===status){
                ele.id=index.toString();
                acc.push(ele);
            }
            return acc;
        },[]);
        return (
            <div>{filteredData.map((ele) =>
                <Draggable id={ele.id} key={ele.id} style={{ margin: '8px' }}><Item>{ele.task}</Item></Draggable>)}
            </div>
        )
    }
    render() {
        let tasks = this.props.user.tasks;
        return (
            <Wrapper>
                <Droppable id='NYS' style={droppableStyle}>
                    <h4>todo</h4>
                    {this.populateTasks(tasks,'NYS')}
                </Droppable>
                <Droppable id='CWO' style={droppableStyle}>
                    <h4>working</h4>
                    {this.populateTasks(tasks,'CWO')}
                </Droppable>
                <Droppable id='COM' style={droppableStyle}>
                    <h4>done</h4>
                    {this.populateTasks(tasks,'COM')}
                </Droppable>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => ({
    user: state.login.user
});

export default connect(mapStateToProps, {})(DndTest);
// export default DndTest;
