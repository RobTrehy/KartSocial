import { PigeonProps } from 'pigeon-maps';
import React, { useState } from 'react';

interface MarkerProps extends PigeonProps {
  color?: string;
  pulseColor?: string;
  payload?: any;

  width?: number;
  height?: number;

  // optional modifiers
  hover?: boolean;
  style?: React.CSSProperties;
  className?: string;

  children?: JSX.Element;

  text?: string;

  // callbacks
  onClick?: ({
    event: HTMLMouseEvent,
    anchor: Point,
    payload: any,
  }) => void;
  onContextMenu?: ({
    event: HTMLMouseEvent,
    anchor: Point,
    payload: any,
  }) => void;
  onMouseOver?: ({
    event: HTMLMouseEvent,
    anchor: Point,
    payload: any,
  }) => void;
  onMouseOut?: ({
    event: HTMLMouseEvent,
    anchor: Point,
    payload: any,
  }) => void;
}

export function MarkerDot(props: MarkerProps): JSX.Element {
  const width =
    typeof props.width !== 'undefined'
      ? props.width
      : typeof props.height !== 'undefined'
        ? props.height
        : 34;
  const height =
    typeof props.height !== 'undefined'
      ? props.height
      : typeof props.width !== 'undefined'
        ? props.width
        : 34;
  const [internalHover, setInternalHover] = useState(props.hover || false);
  const hover =
    typeof props.hover === 'undefined' ? internalHover : props.hover;
  const color = props.color || '#93C0D0';
  const pulseColor = props.pulseColor || '#93C0D0';

  // what do you expect to get back with the event
  const eventParameters = (event: React.MouseEvent) => ({
    event,
    anchor: props.anchor,
    payload: props.payload,
  });

  return (
    <div
      style={{
        position: 'absolute',
        transform: `translate(${props.left - width / 2}px, ${props.top - (height - 1)
          }px)`,
        filter: hover ? 'drop-shadow(0 0 4px rgba(0, 0, 0, .3))' : '',
        pointerEvents: 'none',
        cursor: 'pointer',
        ...(props.style || {}),
      }}
      className={
        props.className
          ? `${props.className} pigeon-click-block`
          : `pigeon-click-block ${hover ? 'z-50' : ''}`
      }
      onClick={
        props.onClick ? event => props.onClick(eventParameters(event)) : null
      }
      onContextMenu={
        props.onContextMenu
          ? event => props.onContextMenu(eventParameters(event))
          : null
      }
      onMouseOver={event => {
        props.onMouseOver && props.onMouseOver(eventParameters(event));
        setInternalHover(true);
      }}
      onMouseOut={event => {
        props.onMouseOut && props.onMouseOut(eventParameters(event));
        setInternalHover(false);
      }}
    >
      <span className={`relative flex h-${height} w-${width}`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${pulseColor} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-${height} w-${width} ${color}`}></span>
      </span>
    </div>
  );
}
