import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Droppable extends Component {

  drop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('transfer');
    // console.log(e.target.id)
    // console.log(document.getElementById(data).textContent)
    if (e.target.classList.contains('DndTest-title-102')) e.target.parentNode.appendChild(document.getElementById(data));
    if (e.target.classList.contains('ffmMtm'))e.target.parentNode.parentNode.appendChild(document.getElementById(data));
    if (e.target.id === 'NYS'|| e.target.id === 'CWO' || e.target.id ==='COM')e.target.appendChild(document.getElementById(data));
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

export default Droppable
