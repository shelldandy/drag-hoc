import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

export const NONE = 'NONE';
export const UP = 'UP';
export const DOWN = 'DOWN';
export const RIGHT = 'RIGHT';
export const LEFT = 'LEFT';

const initialState = {
	startX: 0,
	diffX: 0,
	startY: 0,
	diffY: 0,
	dragging: false,
	pressed: false,
	enoughX: false,
	enoughY: false,
	dragDirectionX: NONE,
	dragDirectionY: NONE,
};

class Drag extends Component {
	dragRef = createRef()

	state = initialState

	dragStart = event => {
		if (! event.touches) event.preventDefault();
		const dragArea = this.dragRef.current;
		const touchMode = !!event.touches;

		const pageX = touchMode ? event.touches[0].pageX : event.pageX;
		const pageY = touchMode ? event.touches[0].pageY : event.pageY;

		const startX = pageX - dragArea.offsetLeft;
		const startY = pageY - dragArea.offsetTop;
		this.setState({
			pressed: true,
			startX,
			startY,
		});
	}

	dragMove = event => {
		event.preventDefault();
		const { pressed, startX, startY } = this.state;
		const { hasBeenDraggedEnough, getDragDirection } = this;
		const { horizontalCallback, verticalCallback} = this.props;

		if (! pressed) return;
		const dragArea = this.dragRef.current;
		const touchMode = !!event.touches;

		const pageX = touchMode ? event.touches[0].pageX : event.pageX;
		const pageY = touchMode ? event.touches[0].pageY : event.pageY;

		const endX = pageX - dragArea.offsetLeft;
		const endY = pageY - dragArea.offsetTop;
		const diffX = startX - endX;
		const diffY = startY - endY;

		const { enoughX, enoughY } = hasBeenDraggedEnough({ dragArea, diffX, diffY });
		const { dragDirectionX, dragDirectionY } = getDragDirection({ diffX, diffY });

		if (horizontalCallback && enoughX) {
			horizontalCallback(dragDirectionX);
			return this.resetState();
		}

		if (verticalCallback && enoughY) {
			verticalCallback(dragDirectionY);
			return this.resetState();
		}

		return this.setState({
			dragging: true,
			diffX,
			dragDirectionX,
			enoughX,
			diffY,
			dragDirectionY,
			enoughY,
		});
	}

	dragEnd = event => {
		if (! event.touches) event.preventDefault();
		this.resetState();
	}

	resetState = () => {
		this.setState(initialState);
	}

	getAreaSize = dragArea => {
		const rect = dragArea.getBoundingClientRect();
		return {
			width: rect.width,
			height: rect.height,
		};
	}

	hasBeenDraggedEnough = ({ dragArea, diffX, diffY }) => {
		const { threshold } = this.props;
		const { width, height } = this.getAreaSize(dragArea);
		const minDragX = width * threshold;
		const minDragY = height * threshold;
		return {
			enoughX: Math.abs(diffX) > minDragX,
			enoughY: Math.abs(diffY) > minDragY
		}
	}

	getDragDirection = ({ diffX, diffY }) => {
		const NONE_X = diffX === 0;
		const rightX = !NONE_X && diffX < 0;

		const NONE_Y = diffY === 0;
		const upY = !NONE_Y && diffY > 0;
		return {
			dragDirectionX: NONE_X ? NONE : rightX ? RIGHT : LEFT,
			dragDirectionY: NONE_Y ? NONE : upY ? UP : DOWN,
		};
	}

	render() {
		const { children, noWrapper } = this.props;
		const {
			dragRef, dragStart,
			dragMove, dragEnd,
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
		horizontalCallback: PropTypes.func,
		verticalCallback: PropTypes.func,
		threshold: PropTypes.number,
	}

	static defaultProps = {
		threshold: 0.20
	}
}

export default Drag;
