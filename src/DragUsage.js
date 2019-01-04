import React from 'react'
import DragHOC from './DragHoc'

const DragUsage = () => {
  const dragX = dragDirection => {
    console.log(dragDirection)
  }

  const dragY = dragDirection => {
    console.log(dragDirection)
  }

  return (
  <DragHOC horizontalCallback={dragX} verticalCallback={dragY} noWrapper>
    {({
      dragRef,
      behaviorProps,
      dragging,
      pressed,
      diffX,
      diffY,
      enoughX,
      enoughY,
      dragDirectionX,
      dragDirectionY,
    }) => (
      <div className="Drag-situation" ref={dragRef} { ...behaviorProps }>
        <p>Pressed: { String(pressed) }</p>
        <p>Dragging: { String(dragging) }</p>

        <p>Diff X: { String(diffX) }</p>
        <p>Diff Y: { String(diffY) }</p>

        <p>Drag Direction X: { String(dragDirectionX) }</p>
        <p>Drag Direction Y: { String(dragDirectionY) }</p>

        <p>Enough X: { String(enoughX) }</p>
        <p>Enough Y: { String(enoughY) }</p>
      </div>
    )}
  </DragHOC>
  )
}

export default DragUsage
