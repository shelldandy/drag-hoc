import React from 'react'
import DragHOC from './DragHoc'

const DragUsage = () => (
  <DragHOC noWrapper>
    {({
      dragRef,
      behaviorProps,
      dragging,
      pressed,
      dragDirection,
    }) => (
      <div className="Drag-situation" ref={dragRef} { ...behaviorProps }>
        <p>Pressed: { String(pressed) }</p>
        <p>Dragging: { String(dragging) }</p>
        <p>Drag Direction: { String(dragDirection) }</p>
      </div>
    )}
  </DragHOC>
)

export default DragUsage
