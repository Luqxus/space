import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar/toolbar";
import { CursorsPresence } from "./cursors-presence";
import { useMutation, useStorage, useOthersMapped, useHistory } from "@liveblocks/react";
import React, { useCallback, useMemo, useState } from "react";
import { CanvasMode, Color, LayerType, MAX_LAYERS, Plane, Point, Side, XYWH } from "../types/canvas";
import { pointerEventToCanvasPoint, resizeBounds } from "@/lib/utils";
import { LiveObject, nanoid } from "@liveblocks/client";
import { useCanvasState } from "@/hooks/use-canvas-state";
import { ToolType } from "../types/tools";
import { LayerPreview } from "./layer-preview";
import { SelectionBox } from './selection-box';

type CanvasProps = {
  boardId: string
}

export const Canvas = (props: CanvasProps) => {
  const layerIds = useStorage((storage) => storage.layerIds);
  const selections = useOthersMapped((other) => other.presence.selection);
  const { state: canvasState, changeTool, onMutateCanvasState } = useCanvasState();
  const [plane, setPlane] = useState<Plane>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 255, g: 255, b: 255 });
  const history = useHistory();

  /**
   * Inserts a new layer onto the canvas at the given position.
   * Enforces the MAX_LAYERS limit, assigns a unique ID, sets the layer's
   * type/position/dimensions/fill, and shifts selection to the new layer.
   *
   * @param layerType - The type of layer to insert (ellipse, frame, note, rectangle, or text).
   * @param position - The canvas coordinates at which to place the new layer.
   */
  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.ELLIPSE | LayerType.FRAME | LayerType.NOTE | LayerType.RECTANGLE | LayerType.TEXT,
    position: Point
  ) => {
    const liveLayers = storage.get("layers");
    if (liveLayers.size >= MAX_LAYERS) {
      return;
    }

    const liveLayerIds = storage.get("layerIds");
    const layerId = nanoid();
    const layer = new LiveObject({
      type: layerType,
      position: position,
      dimentions: {
        height: 100,
        width: 100,
      },
      fill: lastUsedColor
    });

    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);

    setMyPresence({ selection: [layerId] }, { addToHistory: true });
    changeTool(ToolType.SELECT);
  }, [lastUsedColor]);

  const resizeLayer = useMutation((
    {storage, self},
    point: Point
  ) => {
    if (canvasState.mode !== CanvasMode.RESIZING) {
      return;
    }

    const bounds = resizeBounds(canvasState.initialBound, canvasState.corner, point);
    const liveLayers = storage.get("layers");
    const layer = liveLayers.get(self.presence.selection[0]);

    if (layer) {
      layer.update({...layer, position: {x: bounds.x, y: bounds.y}, dimentions: {width: bounds.width, height: bounds.height}});
    }
  }, [canvasState]);


  const onResizePointerDown = useCallback((corner: Side, initialBounds: XYWH) => {
      history.pause();
      onMutateCanvasState({
          tool: ToolType.SELECT,
          mode: CanvasMode.RESIZING,
          initialBound: initialBounds,
          corner,
          permission: canvasState.permission
      });
  
  }, [history, canvasState]);

  /**
   * Handles wheel events on the SVG canvas to pan the viewport.
   * Adjusts the plane offset by the wheel's delta values.
   *
   * @param e - The React wheel event from the SVG element.
   */
  const onWheel = useCallback((e: React.WheelEvent) => {
    setPlane((plane) => ({
      x: plane.x - e.deltaX,
      y: plane.y - e.deltaY
    }));
  }, []);

  /**
   * Tracks the user's pointer position on the canvas and broadcasts
   * it to other participants via Liveblocks presence.
   *
   * @param e - The React pointer event used to derive the canvas-space cursor position.
   */
  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, plane);

    if(canvasState.mode === CanvasMode.RESIZING)  {
      resizeLayer(current)
    }

    setMyPresence({ cursor: current });
  }, [plane, canvasState, resizeLayer]);

  /**
   * Clears the user's cursor from presence when the pointer leaves the canvas,
   * hiding it from other participants.
   *
   * @param e - The React pointer event fired when the cursor exits the SVG element.
   */
  const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    setMyPresence({ cursor: null });
  }, []);

  /**
   * Handles pointer-up events on the canvas.
   * If the canvas is in INSERTING mode, inserts a new layer at the pointer position.
   * Otherwise, resets the active tool to SELECT.
   *
   * @param e - The React pointer event fired on mouse/touch release.
   */
  const onPointerUp = useMutation(({ }, e: React.PointerEvent) => {
    e.preventDefault();
    const point = pointerEventToCanvasPoint(e, plane);

    if (canvasState.mode == CanvasMode.INSERTING) {
      insertLayer(canvasState.layerType, point);
    } else {
      changeTool(ToolType.SELECT);
    }
  }, [plane, canvasState, history, insertLayer]);

  /**
   * Handles pointer-down events on individual layers.
   * Pauses history, updates the user's selection to the targeted layer,
   * and transitions the canvas into TRANSLATING mode for drag-to-move behaviour.
   * No-ops when in INSERTING or PENCIL mode.
   *
   * @param e - The React pointer event fired on the layer element.
   * @param layerId - The ID of the layer that was clicked.
   */
  const onLayerPointDown = useMutation((
    { self, setMyPresence },
    e: React.PointerEvent,
    layerId: string
  ) => {
    if (canvasState.mode == CanvasMode.INSERTING || canvasState.mode == CanvasMode.PENCIL) {
      return;
    }

    history.pause();
    e.stopPropagation();

    const point = pointerEventToCanvasPoint(e, plane);

    if (!self.presence.selection.includes(layerId)) {
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
    }

    onMutateCanvasState({ mode: CanvasMode.TRANSLATING, current: point, tool: ToolType.SELECT, permission: canvasState.permission });
  }, [onMutateCanvasState, plane, history, canvasState.mode]);

  /**
   * Derives a map of layerId → highlight colour from other participants' selections.
   * Used to render coloured outlines on layers that others currently have selected.
   *
   * @returns A record mapping each selected layer ID to its assigned highlight colour.
   */
  const selectionColors = useMemo(() => {
    console.log("Selections:", selections);
    const selectionColorsMap: Record<string, string> = {};
    selections.map(selection => selection[1])
      .flat()
      .map(layerId => {
        selectionColorsMap[layerId] = "#FF0000";
      });

    console.log(selectionColorsMap);
    return selectionColorsMap;
  }, [selections]);

  return (
    <main className="h-full w-full relative bg-neutral-100 touch-none">
      <Info boardId={props.boardId} />
      <Participants />
      <Toolbar />

      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
      >
        <g style={{
          transform: `translate(${plane.x}px, ${plane.y}px)`
        }}>
          {
            layerIds?.map((layerId) => (
              <LayerPreview
                key={layerId}
                id={layerId}
                onLayerPointDown={onLayerPointDown}
                selectionColor={selectionColors[layerId]}
              />
            ))
          }
          <SelectionBox onResizeHandlePointerDown={onResizePointerDown} />
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

