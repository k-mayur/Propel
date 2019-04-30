import React, { Component } from 'react'
import styled from 'styled-components'
import Draggable from '../draggable/index'
import Droppable from '../droppable/index'

const Wrapper = styled.div`
// width:100%;
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
    backgroundColor:'#555',
    minWidth:'250px',
    height:'400px',
    margin:'32px',
}
class DndTest extends Component {
    render() {
        return (
            <Wrapper>
                <Droppable id='dr1' style={droppableStyle}>
                    <h4>todo</h4>
                    <Draggable id='item1' style={{ margin: '8px' }}><Item>some</Item></Draggable>
                    <Draggable id='item2' style={{ margin: '8px' }}><Item>asd</Item></Draggable>
                </Droppable>
                <Droppable id='dr2' style={droppableStyle}>
                    <h4>working</h4>
                    <Draggable id='item3' style={{ margin: '8px' }}><Item>ggg</Item></Draggable>
                    <Draggable id='item4' style={{ margin: '8px' }}><Item>eee</Item></Draggable>
                </Droppable>
                <Droppable id='dr3' style={droppableStyle}>
                    <h4>done</h4>
                    <Draggable id='item5' style={{ margin: '8px' }}><Item>poi</Item></Draggable>
                    <Draggable id='item6' style={{ margin: '8px' }}><Item>toi</Item></Draggable>
                </Droppable>
            </Wrapper>
        )
    }
}

export default DndTest;
