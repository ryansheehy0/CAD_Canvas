import Solid, { createSignal } from 'solid-js'
import { useGlobalContext } from '../../App'
import line from "../../assets/tools/line.svg"
import { twMerge } from 'tailwind-merge'

type Line = {
	startX: number
	startY: number
	endX: number
	endY: number
}

const Line: Solid.Component = () => {
	const [isSelected, setIsSelected] = createSignal(false)
	const {setSVGElements, setMouseDown, setMouseMove} = useGlobalContext()

	let isDrawing = false

	let startX: number
	let startY: number
	let endX: number
	let endY: number

	const lineMouseDown = (event: MouseEvent) => {
		const {offsetX, offsetY} = event
		if(isDrawing){
			lines.push({startX, startY, endX, endY})
			isDrawing = false
		}else{
			startX = offsetX
			startY = offsetY
			isDrawing = true
		}
	}


	const lineMouseMove = (event: MouseEvent, canvasContext: CanvasRenderingContext2D) => {
		if(!isDrawing) return
		canvasContext.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height)
		drawLines(lines, canvasContext)
		canvasContext.beginPath()
		canvasContext.moveTo(startX, startY)
		endX = event.offsetX
		endY = event.offsetY
		canvasContext.lineTo(event.offsetX, event.offsetY)
		canvasContext.stroke()
	}

	function lineClicked(){
		if(isSelected()){
			setIsSelected(false)
			setMouseDown(lineMouseDown())
			setMouseMove()
		}else{
			setIsSelected(true)
			setMouseDown(null)
			setMouseMove(null)
		}
	}

	return (
		<button
			onClick={() => }
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				isSelected() ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={line} class='w-6 h-6'/>
		</button>
	)
}

export default Line




