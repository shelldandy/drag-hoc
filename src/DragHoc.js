import { Component, createRef } from 'react'

class DragHOC extends Component {
  dragRef = createRef()

  state = {
    pressed: false,
    dragging: false,
    dragDirection: null,
  }

  dragStart = event => {
    event.preventDefault()
    this.setState({ pressed: true })
  }

  dragEnd = event => {
    event.preventDefault()
    this.setState({ pressed: false })
  }

  listenDrags = dragArea => {
    dragArea.addEventListener('mousedown', this.dragStart)
    dragArea.addEventListener('touchstart', this.dragStart)

    dragArea.addEventListener('mouseup', this.dragEnd)
    dragArea.addEventListener('touchend', this.dragEnd)
    dragArea.addEventListener('mouseleave', this.dragEnd)
  }

  unlistenDrags = dragArea => {
    dragArea.removeEventListener('mousedown', this.dragStart)
    dragArea.removeEventListener('touchstart', this.dragStart)

    dragArea.removeEventListener('mouseup', this.dragEnd)
    dragArea.removeEventListener('touchend', this.dragEnd)
    dragArea.removeEventListener('mouseleave', this.dragEnd)
  }

  componentDidMount () {
    const {
      dragRef,
      listenDrags,
    } = this;
    const dragArea = dragRef.current
    listenDrags(dragArea)
  }

  componentWillUnmount () {
    const {
      dragRef,
      unlistenDrags,
    } = this;
    const dragArea = dragRef.current
    unlistenDrags(dragArea)
  }

  render () {
    const { children } = this.props
    const { dragRef } = this
    const passedProps = {
      ...this.state,
      dragRef,
    }
    return children({ ...passedProps })
  }
}

export default DragHOC
