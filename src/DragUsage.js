import React, { PureComponent, Fragment } from 'react'
import DragHOC, { UP, RIGHT, NONE } from './DragHoc'

class DragUsage extends PureComponent {
  state = {
    right: 0,
    left: 0,
    up: 0,
    down: 0,
  }

  horizontal = direction => {
    const { right, left } = this.state
    if (direction === NONE) return
    if (direction === RIGHT) return this.setState({ right: right + 1 })
    return this.setState({ left: left + 1 })
  }

  vertical = direction => {
    const { up, down } = this.state
    if (direction === NONE) return
    if (direction === UP) return this.setState({ up: up + 1 })
    return this.setState({ down: down + 1 })
  }

  render () {
    const { vertical, horizontal } = this
    return (
      <Fragment>
        <DragHOC noWrapper horizontalCallback={horizontal} verticalCallback={vertical}>
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

        <div>
          <p>Right: {this.state.right}</p>
          <p>Left: {this.state.left}</p>
          <p>Up: {this.state.up}</p>
          <p>Down: {this.state.down}</p>
        </div>
      </Fragment>
    )
  }
}

export default DragUsage
