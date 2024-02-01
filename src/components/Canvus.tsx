import Solid, { createSignal, onMount } from 'solid-js'

type Line = {
	startX: number
	startY: number
	endX: number
	endY: number
}

const Canvas: Solid.Component = (props) => {
	const [isDrawing, setIsDrawing] = createSignal(false)
	let canvasRef: HTMLCanvasElement
	let canvasContext: CanvasRenderingContext2D
	let startX: number
	let startY: number
	let endX: number
	let endY: number
	let lines: Line[] = []

	function drawLines(lines: Line[]){
		for(const line of lines){
			canvasContext.beginPath()
			canvasContext.moveTo(line.startX, line.startY)
			canvasContext.lineTo(line.endX, line.endY)
			canvasContext.stroke()
		}
	}

	onMount(() => {
		const context = canvasRef.getContext('2d')
		if(context) canvasContext = context
		canvasContext.lineCap = "round"
		canvasContext.strokeStyle = "black"
		canvasContext.lineWidth = 5

		canvasRef.width = window.innerWidth
		canvasRef.height = window.innerHeight
	})

	function mouseDown(event: MouseEvent){
		const {offsetX, offsetY} = event
		if(isDrawing()){
			lines.push({startX, startY, endX, endY})
			setIsDrawing(false)
		}else{
			startX = offsetX
			startY = offsetY
			setIsDrawing(true)
		}
	}

	function move(event: MouseEvent){
		if(!isDrawing()) return
		canvasContext.clearRect(0, 0, canvasRef.width, canvasRef.height)
		drawLines(lines)
		canvasContext.beginPath()
		canvasContext.moveTo(startX, startY)
		endX = event.offsetX
		endY = event.offsetY
		canvasContext.lineTo(event.offsetX, event.offsetY)
		canvasContext.stroke()
	}

	return (
		<canvas ref={canvasRef!} class="w-screen h-screen bg-white overflow-hidden"
			onMouseDown={mouseDown}
			onMouseMove={move}
		>
		</canvas>
	)
}

export default Canvas