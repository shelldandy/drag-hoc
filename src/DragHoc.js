import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

class Drag extends Component {
	dragRef = createRef()

	state = {
		startX: 0,
		diffX: 0,
		startY: 0,
		diffY: 0,
		dragging: false,
		pressed: false,
		dragDirection: null,
	}

	dragStart = event => {
		event.preventDefault();
		const dragArea = this.dragRef.current;
		const startX = event.pageX - dragArea.offsetLeft;
		this.setState({
			pressed: true,
			startX,
		});
	}

	dragMove = event => {
		const {
			pressed,
			startX,
		} = this.state;
		if (! pressed) return;

		const dragArea = this.dragRef.current;
		const endX = event.pageX - dragArea.offsetLeft;
		const diffX = startX - endX;

		this.setState({
			dragging: true,
			diffX,
		});
	}

	dragEnd = event => {
		event.preventDefault();
		this.setState({
			startX: 0,
			startY: 0,
			diffX: 0,
			diffY: 0,
			pressed: false,
			dragging: false,
			dragDirection: null,
		});
	}

	render() {
		const { children, noWrapper } = this.props;
		const {
			dragRef,
			dragStart,
			dragMove,
			dragEnd,
		} = this;

		const behaviorProps = {
			role: 'presentation',
			onMouseDown: dragStart,
			onMouseMove: dragMove,
			onMouseUp: dragEnd,
			onMouseLeave: dragEnd,
			onTouchStart: dragStart,
			onTouchMove: dragMove,
			onTouchEnd: dragEnd,
			onTouchCancel: dragEnd,
		};

		return noWrapper
			? children({ ...this.state, dragRef, behaviorProps })
			: (
				<div { ...behaviorProps } ref={dragRef}>
					{children({ ...this.state })}
				</div>
			);
	}

	static propTypes = {
		children: PropTypes.func.isRequired,
		noWrapper: PropTypes.bool,
		dragX: PropTypes.func,
		dragY: PropTypes.func,
		threshold: PropTypes.number,
	}
}

export default Drag;
