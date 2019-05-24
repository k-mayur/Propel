import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { draggedItemId } from '../draggable/index'

let taskId = '';
let status = ''

class Droppable extends Component {
  drop = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('MuiTypography-root-44')) {
      taskId = draggedItemId; 
      status = e.target.parentNode.id;
    }
    if (e.target.classList.contains('item')) {
      taskId = draggedItemId; 
      status = e.target.parentNode.parentNode.id;
    }
    if (e.target.id === 'NYS' || e.target.id === 'CWO' || e.target.id === 'COM') {
      taskId = draggedItemId;
      status = e.target.id;
    }
    if (e.target.classList.contains('mentor') || e.target.classList.contains('user')){
      taskId = draggedItemId;
      status=e.target.parentNode.parentNode.parentNode.id;
    }
    if(e.target.classList.contains('userDiv')){
      taskId = draggedItemId;
      status = e.target.parentNode.parentNode.parentNode.parentNode.id;
    }
    if (status !== '') return this.props.changeStatus(taskId, status)
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

export default Droppable;
