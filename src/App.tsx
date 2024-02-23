import CommandSideBar from "./components/CommandSideBar"
import UtilitySideBar from "./components/UtilitySideBar"
import { createSignal } from "solid-js"

const [selectedCommand, setSelectedCommand] = createSignal<"line" | "angle" | null>(null)
  export { selectedCommand, setSelectedCommand}
export type SVGElements = SVGLineElement
const [svgElements, setSVGElements] = createSignal<SVGElements[]>([])
// Command changing signals
  // SVG canvas signals
const [mouseDown, setMouseDown] = createSignal<((event: MouseEvent) => void) | null>(null)
const [mouseMove, setMouseMove] = createSignal<((event: MouseEvent) => void) | null>(null)
  // Utility side bar
export type CommandSettings = {
  form: HTMLFormElement
} & {[key: string]: any} | null
const [commandSettings, setCommandSettings] = createSignal<CommandSettings>(null)
  // Element event functions
const [elementClicked, setElementClicked] = createSignal<((event: MouseEvent) => void) | null>(null)
const [mouseEnterElement, setMouseEnterElement] = createSignal<((event: MouseEvent) => void) | null>(null)
const [mouseLeaveElement, setMouseLeaveElement] = createSignal<((event: MouseEvent) => void) | null>(null)



export { svgElements, setSVGElements }

export let svgRef: SVGSVGElement

function App(){
  return (
    <>
      <CommandSideBar/>
      <svg xmlns="http://www.w3.org/2000/svg"
        ref={svgRef!}
        onMouseDown={mouseDown() || undefined}
        onMouseMove={mouseMove() || undefined}
        class="w-[calc(100vw-448px)] h-screen absolute top-0 left-56 bg-black">
        {svgElements()}
      </svg>
      <UtilitySideBar/>
    </>
  )
}

export default App