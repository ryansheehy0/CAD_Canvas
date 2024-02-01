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

  return (
    <globalContext.Provider value={{selectedCommand, setSelectedCommand, selectedTool, setSelectedTool}}>
      <SideBar/>
      <Canvas/>
    </globalContext.Provider>
  )
}

export default App