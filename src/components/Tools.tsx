import Solid, { useContext } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import { useGlobalContext } from '../App'

const Tools: Solid.Component = () => {
	const {selectedTool, setSelectedCommand, setSelectedTool} = useGlobalContext()

	function selectLine(){
		setSelectedCommand("tools")
		setSelectedTool("line")
	}

	return (
		<div class='w-52 h-fit border-black border-solid'>
			<button onClick={selectLine} class={twMerge('bg-white border-black text-black rounded-md w-10 h-10 p-0 m-1 text-base hover:border-black focus:outline-none', selectedTool() === "line" ? "border-2" : "border")}>/</button>
		</div>
	)
}

export default Tools