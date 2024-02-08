import SideBar from "./components/SideBar"
import Solid, { createContext, createEffect, createSignal, useContext } from "solid-js"

/*
type SelectedCommand = "none" | "tools" | "constraints" | "operations" | "components"
type SelectedTool = "none" | "line"
type GlobalContext = {
  selectedCommand: Solid.Accessor<SelectedCommand>
  setSelectedCommand: Solid.Setter<SelectedCommand>
  selectedTool: Solid.Accessor<SelectedTool>
  setSelectedTool: Solid.Setter<SelectedTool>
}
*/
type SVGElements = SVGLineElement

type GlobalContext = {
  svgElements: Solid.Accessor<SVGLineElement[]>
  setSVGElements: Solid.Setter<SVGLineElement[]>
  setMouseDown: Solid.Setter<((event: MouseEvent) => void) | undefined>
  setMouseMove: Solid.Setter<((event: MouseEvent) => void) | undefined>
}

const globalContext = createContext<GlobalContext>()

export function useGlobalContext() {
  const value = useContext(globalContext)
  if(value === undefined) throw new Error("useGlobalContext must be used within globalContext.Provider")
  return value
}

function App() {
  /*
  const [selectedCommand, setSelectedCommand] = createSignal<SelectedCommand>("none")
  const [selectedTool, setSelectedTool] = createSignal<SelectedTool>("none")
  */
  const [mouseDown, setMouseDown] = createSignal<((event: MouseEvent) => void) | undefined>(() => {})
  const [mouseMove, setMouseMove] = createSignal<((event: MouseEvent) => void) | undefined>(() => {})
  const [selectedSVGElements, setSelectedSVGElements] = createSignal<SVGElements[]>([])
  const [svgElements, setSVGElements] = createSignal<SVGElements[]>([])

  return (
    <globalContext.Provider value={{svgElements, setSVGElements, setMouseDown, setMouseMove}}>
      <SideBar/>
      <svg xmlns="http://www.w3.org/2000/svg"
        onMouseDown={mouseDown()}
        onMouseMove={mouseMove()}
        class="w-[calc(100vw-224px)] h-screen absolute top-0 right-0 bg-white">
        {svgElements()}
      </svg>
    </globalContext.Provider>
  )
}

export default App