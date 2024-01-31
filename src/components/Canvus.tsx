import Solid, { createSignal, onMount } from 'solid-js'

type CanvasProps = {

}

const Canvas: Solid.Component<CanvasProps> = (props) => {
	const [isLine, setIsLine] = createSignal(false)
	let canvasRef
	let canvasContext

	onMount(() => {
		canvasContext = canvasRef.current.getContext('2d')
	})

	function clicked(event){
		const {offsetX, offsetY} = event
		canvasContext.
	}

	function move(event: MouseEvent){
		const {offsetX, offsetY} = event

	}

	return (
		<canvas ref={canvasRef} className="w-screen h-screen bg-red-500" onClick={clicked} onMouseMove={move}>
		</canvas>
	)
}

export default Canvas