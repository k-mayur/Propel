import React, { Component } from 'react'
import PropTypes from 'prop-types';

let draggedItemId ='';

class Draggable extends Component {

    drag = (e) => {
        draggedItemId=e.target.id;
        // console.log(e.target.id)
        e.dataTransfer.setData('transfer', e.target.id);
    }

    // noAllowDrop = (e) => {
    //     // console.log(e.target.id)
    //     if (e.target.parentNode.id === draggedItemId) e.stopPropagation();
    // }

    render() {
        return (
            <div id={this.props.id} draggable='true' onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

Draggable.propTypes = {
    id: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
}

export  { Draggable, draggedItemId};
