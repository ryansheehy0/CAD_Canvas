import Solid, { createSignal } from 'solid-js'
import { useGlobalContext } from '../../App'
import line from "../../assets/tools/line.svg"
import { twMerge } from 'tailwind-merge'

const Line: Solid.Component = () => {
	const [isSelected, setIsSelected] = createSignal(false)
	const {svgElements, setSVGElements, setMouseDown, setMouseMove} = useGlobalContext()

	let isDrawing = false
	let lineIndex = 0

	const lineMouseDown = (event: MouseEvent): void => {
		console.log("mouse down")
		const {offsetX, offsetY} = event
		if(isDrawing){
			isDrawing = false
		}else{
			lineIndex = svgElements().length
			setSVGElements((svgElements) => [
				...svgElements,
				<line x1={offsetX} y1={offsetY} x2={offsetX} y2={offsetY}/> as SVGLineElement
			])
			isDrawing = true
		}
	}

	const lineMouseMove = (event: MouseEvent): void => {
		console.log("mouse move")
		if(!isDrawing) return
		const {offsetX, offsetY} = event
		setSVGElements((svgElements) => {
			let x1 = svgElements[lineIndex].x1.baseVal.value
			let y1 = svgElements[lineIndex].y1.baseVal.value
			svgElements[lineIndex] = <line x1={x1} y1={y1} x2={offsetX} y2={offsetY} stroke='gray' stroke-width={2} /> as SVGLineElement
			return [...svgElements]
		})
	}

	function lineClicked(){
		console.log("clicked")
		if(isSelected()){
			setIsSelected(false)
			setMouseDown(() => lineMouseDown)
			setMouseMove(() => lineMouseMove)
		}else{
			setIsSelected(true)
			setMouseDown(undefined)
			setMouseMove(undefined)
		}
	}

	return (
		<button
			onClick={lineClicked}
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				isSelected() ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={line} class='w-6 h-6'/>
		</button>
	)
}

export default Line