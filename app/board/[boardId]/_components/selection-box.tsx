'use client';

import { memo } from 'react';
import { LayerType, Side, Point, XYWH } from '../types/canvas';
import { useSelf, useStorage } from '@liveblocks/react';
import { useSelectionBounds } from '@/hooks/use-selection-bounds';

type SelectionBoxProps = {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

type ResizeHandleProps = {
  point: Point,
  cursor: string;
  resizeHandler: () => void;
}

const ResizeHandle = (props: ResizeHandleProps) => {
  return <rect
    className='fill-white stroke-1 stroke-blue-500'
    x={0}
    y={0}
    style={{
      cursor: `${props.cursor}`,
      width: `${HANDLE_WIDTH}px`,
      height: `${HANDLE_WIDTH}px`,
      transform: `translate(${props.point.x}px, ${props.point.y}px)`
    }}
    onPointerDown={(e) => {
      e.stopPropagation();
      props.resizeHandler();
    }}
  />
}

export const SelectionBox = memo((props: SelectionBoxProps) => {
  const soleLayerId = useSelf((me) => {
    return me.presence.selection.length === 1 ? me.presence.selection[0] : null
  });

  const isShowingHandles = useStorage((storage) => soleLayerId && storage.layers[soleLayerId]?.type !== LayerType.PATH);

  const bounds = useSelectionBounds();

  if (!bounds) {
    return null
  };

  return (
    <>
      <rect
        className='fill-transparent stroke-blue-500 stroke-1 pointer-events-none'
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />
      {isShowingHandles &&
        <>
          <ResizeHandle
            cursor="nwse-resize"
            point={{
              x: bounds.x - HANDLE_WIDTH / 2,
              y: bounds.y - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.TOP + Side.LEFT, bounds);
            }} />

          <ResizeHandle
            cursor="ns-resize"
            point={{
              x: bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2,
              y: bounds.y - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.TOP, bounds);
            }} />

          <ResizeHandle
            cursor="nesw-resize"
            point={{
              x: bounds.x + bounds.width - HANDLE_WIDTH / 2,
              y: bounds.y - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.TOP + Side.RIGHT, bounds);
            }} />

          <ResizeHandle
            cursor="ew-resize"
            point={{
              x: bounds.x + bounds.width - HANDLE_WIDTH / 2,
              y: bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.RIGHT, bounds);
            }} />

          <ResizeHandle
            cursor="nwse-resize"
            point={{
              x: bounds.x + bounds.width - HANDLE_WIDTH / 2,
              y: bounds.y + bounds.height - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.BOTTOM + Side.RIGHT, bounds);
            }} />

          <ResizeHandle
            cursor="ns-resize"
            point={{
              x: bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2,
              y: bounds.y + bounds.height - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.BOTTOM, bounds);
            }} />

          <ResizeHandle
            cursor="nesw-resize"
            point={{
              x: bounds.x - HANDLE_WIDTH / 2,
              y: bounds.y + bounds.height - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.BOTTOM + Side.LEFT, bounds);
            }} />

          <ResizeHandle
            cursor="ew-resize"
            point={{
              x: bounds.x - HANDLE_WIDTH / 2,
              y: bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2
            }}
            resizeHandler={() => {
              props.onResizeHandlePointerDown(Side.LEFT, bounds);
            }} />
        </>
      }
    </>
  );
});




SelectionBox.displayName = "SelectionBox"
