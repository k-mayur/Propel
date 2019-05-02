import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { draggedItemId } from '../draggable/index'

let taskId = '';
let status = ''

class Droppable extends Component {
  drop = (e) => {
    e.preventDefault();
    // const data = e.dataTransfer.getData('transfer');
    // console.log(e.target.id)
    // console.log(document.getElementById(data).textContent)
    // console.log(draggedItemId)
    if (e.target.classList.contains('DndTest-title-102')) {
      // e.target.parentNode.appendChild(document.getElementById(data));
      taskId = draggedItemId; status = e.target.parentNode.id;
    }
    if (e.target.classList.contains('ffmMtm')) {
      // e.target.parentNode.parentNode.appendChild(document.getElementById(data));
      taskId = draggedItemId; status = e.target.parentNode.parentNode.id;
    }
    if (e.target.id === 'NYS' || e.target.id === 'CWO' || e.target.id === 'COM') {
      // e.target.appendChild(document.getElementById(data)); 
      taskId = draggedItemId;
      status = e.target.id;
    }
    return this.props.changeStatus(taskId,status)
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div id={this.props.id} onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
        {this.props.children}
      </div>
    )
  }
}

Droppable.propTypes = {
  id: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node
}

export { Droppable, taskId, status }
