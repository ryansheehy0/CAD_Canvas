import Canvas from "./components/Canvus"
import SideBar from "./components/SideBar"
import Solid, { createContext, createSignal, useContext } from "solid-js"

type SelectedCommand = "none" | "tools" | "constraints" | "operations" | "components"
type SelectedTool = "none" | "line"
type GlobalContext = {
  selectedCommand: Solid.Accessor<SelectedCommand>
  setSelectedCommand: Solid.Setter<SelectedCommand>
  selectedTool: Solid.Accessor<SelectedTool>
  setSelectedTool: Solid.Setter<SelectedTool>
  mouseDown: Solid.Accessor<(event: MouseEvent) => void>
  setMouseDown: Solid.Setter<(event: MouseEvent) => void>
  mouseMove: Solid.Accessor<(event: MouseEvent, canvasContext: CanvasRenderingContext2D) => void>
  setMouseMove: Solid.Setter<(event: MouseEvent, canvasContext: CanvasRenderingContext2D) => void>
}

const globalContext = createContext<GlobalContext>()

export function useGlobalContext() {
  const value = useContext(globalContext)
  if(value === undefined) throw new Error("useGlobalContext must be used within globalContext.Provider")
  return value
}

function App() {
  const [selectedCommand, setSelectedCommand] = createSignal<SelectedCommand>("none")
  const [selectedTool, setSelectedTool] = createSignal<SelectedTool>("none")
  const [mouseDown, setMouseDown] = createSignal<(event: MouseEvent) => void>(() => {})
  const [mouseMove, setMouseMove] = createSignal<(event: MouseEvent, canvasContext: CanvasRenderingContext2D) => void>(() => {})

  return (
    <globalContext.Provider value={{selectedCommand, setSelectedCommand, selectedTool, setSelectedTool, mouseDown, setMouseDown, mouseMove, setMouseMove}}>
      <SideBar/>
      <Canvas/>
    </globalContext.Provider>
  )
}

export default App