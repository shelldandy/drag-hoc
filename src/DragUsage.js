import React from 'react'
import DragHOC from './DragHoc'

const DragUsage = () => (
  <DragHOC>
    {({
      dragRef,
      dragging,
      pressed,
      dragDirection,
    }) => (
      <div className="Drag-situation" ref={dragRef}>
        <p>Pressed: { String(pressed) }</p>
        <p>Dragging: { String(dragging) }</p>
        <p>Drag Direction: { String(dragDirection) }</p>
      </div>
    )}
  </DragHOC>
)

export default DragUsage
