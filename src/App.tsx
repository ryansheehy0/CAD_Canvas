import CommandSideBar from "./components/CommandSideBar"
import UtilitySideBar from "./components/UtilitySideBar"
import { createSignal } from "solid-js"

export const [selectedCommand, setSelectedCommand] = createSignal<"line" | "angle" | null>(null)
export type SVGElements = SVGLineElement
export const [svgElements, setSVGElements] = createSignal<SVGElements[]>([])
// Command changing signals
  // SVG canvas signals
export const [mouseDown, setMouseDown] = createSignal<((event: MouseEvent) => void) | null>(null)
export const [mouseMove, setMouseMove] = createSignal<((event: MouseEvent) => void) | null>(null)
  // Utility side bar
export type CommandSettings = {
  form: HTMLFormElement
} & {[key: string]: any} | null
export const [commandSettings, setCommandSettings] = createSignal<CommandSettings>(null)
  // Element event functions
export const [elementClicked, setElementClicked] = createSignal<((event: MouseEvent) => void) | null>(null)
export const [mouseEnterElement, setMouseEnterElement] = createSignal<((event: MouseEvent) => void) | null>(null)
export const [mouseLeaveElement, setMouseLeaveElement] = createSignal<((event: MouseEvent) => void) | null>(null)

// Implement the element event functions

export let svgRef: SVGSVGElement

function App(){
  return (
    <>
      <CommandSideBar/>
      <svg xmlns="http://www.w3.org/2000/svg"
        ref={svgRef!}
        onMouseDown={(event: MouseEvent) => mouseDown() ? (mouseDown() as (event: MouseEvent) => void)(event) : undefined}
        onMouseMove={(event: MouseEvent) => mouseMove() ? (mouseMove() as (event: MouseEvent) => void)(event) : undefined}
        class="w-[calc(100vw-448px)] h-screen absolute top-0 left-56 bg-black"
      >
        {svgElements()}
      </svg>
      <UtilitySideBar/>
    </>
  )
}

export default App