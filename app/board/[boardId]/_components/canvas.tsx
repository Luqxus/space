import { CanvasStateProvider } from "@/providers/canvas-state-provider";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar/toolbar";
import { CursorsPresence } from "./cursors-presence";
import { useMutation, useStorage, useOthersMapped, useHistory } from "@liveblocks/react";
import React, { useCallback, useMemo, useState } from "react";
import { CanvasMode, Color, LayerType, MAX_LAYERS, Plane, Point } from "../types/canvas";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { LiveObject, nanoid } from "@liveblocks/client";
import { useCanvasState } from "@/hooks/use-canvas-state";
import { ToolType } from "../types/tools";
import { LayerPreview } from "./layer-preview";
import {SelectionBox} from './selection-box';

type CanvasProps = {
  boardId: string
}

export const Canvas = (props: CanvasProps) => {
  const layerIds = useStorage((storage) => storage.layerIds);
  const selections = useOthersMapped((other) => other.presence.selection);
  const { state: canvasState, changeTool, onMutateCanvasState } = useCanvasState();
  const [plane, setPlane] = useState<Plane>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({ r: 255, g: 255, b: 255 });
  const history = useHistory()



  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.ELLIPSE | LayerType.FRAME | LayerType.NOTE | LayerType.RECTANGLE | LayerType.TEXT,
    position: Point
  ) => {
    const liveLayers = storage.get("layers")
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
    changeTool(ToolType.SELECT)
  }, [lastUsedColor])

  const onWheel = useCallback((e: React.WheelEvent) => {
    setPlane((plane) => ({
      x: plane.x - e.deltaX,
      y: plane.y - e.deltaY
    }))
  }, [])

  const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    const current = pointerEventToCanvasPoint(e, plane);
    setMyPresence({ cursor: current })
  }, []);

  const onPointerLeave = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
    e.preventDefault();
    setMyPresence({ cursor: null })
  }, []);

  const onPointerUp = useMutation(({ }, e: React.PointerEvent) => {
    e.preventDefault();
    const point = pointerEventToCanvasPoint(e, plane);

    if (canvasState.mode == CanvasMode.INSERTING) {
      insertLayer(canvasState.layerType, point)
    } else {
      changeTool(ToolType.SELECT)
    }
  }, [plane, canvasState, history, insertLayer]);

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
      setMyPresence({ selection: [layerId] }, { addToHistory: true })
    }

    onMutateCanvasState({ mode: CanvasMode.TRANSLATING, current: point, tool: ToolType.SELECT, permission: canvasState.permission });
  }, [onMutateCanvasState, plane, history, canvasState.mode])

  const selectionColors = useMemo(() => {

    console.log("Selections:", selections)
    const selectionColorsMap: Record<string, string> = {}
    selections.map(selection => selection[1])
      .flat()
      .map(layerId => {
        selectionColorsMap[layerId] = "#FF0000";
      })

    console.log(selectionColorsMap)
    return selectionColorsMap;
  }, [selections])

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
            layerIds?.map((layerId) => {

              return (
                <LayerPreview
                  key={layerId}
                  id={layerId}
                  onLayerPointDown={onLayerPointDown}
                  selectionColor={selectionColors[layerId]}
                />
              );
            })
          }
          <SelectionBox
          onResizeHandlePointerDown={() => {}}/>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

