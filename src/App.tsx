import CommandSideBar from "./components/CommandSideBar"
import UtilitySideBar from "./components/UtilitySideBar"
import { createContext, createSignal, useContext } from "solid-js"

export type SVGElements = SVGLineElement

const [selectedCommand, setSelectedCommand] = createSignal<"line" | "angle" | null>(null)
const [mouseDown, setMouseDown] = createSignal<((event: MouseEvent) => void) | null>(null)
const [mouseMove, setMouseMove] = createSignal<((event: MouseEvent) => void) | null>(null)
const [svgElements, setSVGElements] = createSignal<SVGElements[]>([])
export { svgElements }
type CommandSettings = {
  form: HTMLFormElement
} & {[key: string]: any} | null
const [commandSettings, setCommandSettings] = createSignal<CommandSettings>(null)

const providerValues = {
  selectedCommand, setSelectedCommand,
  mouseDown, setMouseDown,
  mouseMove, setMouseMove,
  svgElements, setSVGElements,
  commandSettings, setCommandSettings
}

const globalContext = createContext<typeof providerValues>()

export function useGlobalContext() {
  const value = useContext(globalContext)
  if(value === undefined) throw new Error("useGlobalContext must be used within globalContext.Provider")
  return value
}

function App(){
  return (
    <globalContext.Provider value={providerValues}>
      <CommandSideBar/>
      <svg xmlns="http://www.w3.org/2000/svg"
        onMouseDown={mouseDown() ? mouseDown() as (event: MouseEvent) => void : undefined}
        onMouseMove={mouseMove() ? mouseMove() as (event: MouseEvent) => void : undefined}
        class="w-[calc(100vw-448px)] h-screen absolute top-0 left-56 bg-black">
        {svgElements()}
      </svg>
      <UtilitySideBar/>
    </globalContext.Provider>
  )
}

export default App