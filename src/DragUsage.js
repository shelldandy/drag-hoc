import React from 'react'
import DragHOC from './DragHoc'

const DragUsage = () => (
  <DragHOC>
    {({
      dragRef,
      dragging,
      pressed,
    }) => (
      <div className="Drag-situation" ref={dragRef}>
        <p>Pressed: { String(pressed) }</p>
        <p>Dragging: { String(dragging) }</p>
      </div>
    )}
  </DragHOC>
)

export default DragUsage
