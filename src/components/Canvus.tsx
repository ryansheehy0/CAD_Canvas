import Solid, { onMount } from 'solid-js'
import { useGlobalContext } from '../App'

const Canvas: Solid.Component = () => {
	let canvasRef: HTMLCanvasElement
	let canvasContext: CanvasRenderingContext2D

	const {mouseDown, mouseMove} = useGlobalContext()

	onMount(() => {
		const context = canvasRef.getContext('2d')
		if(context) canvasContext = context
		canvasContext.lineCap = "round"
		canvasContext.strokeStyle = "black"
		canvasContext.lineWidth = 5

		canvasRef.width = window.innerWidth
		canvasRef.height = window.innerHeight
	})

	return (
		<canvas ref={canvasRef!} class="w-screen h-screen bg-white overflow-hidden"
			onMouseDown={mouseDown()}
			onMouseMove={(event) => mouseMove()(event, canvasContext)}
		>
		</canvas>
	)
}

export default Canvas