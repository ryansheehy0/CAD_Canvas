import Solid from 'solid-js'
import { useGlobalContext } from '../../App'
import line from "../../assets/tools/line.svg"
import { twMerge } from 'tailwind-merge'

const Line: Solid.Component = () => {
	const {svgElements, setSVGElements, setMouseDown, setMouseMove, selectedCommand, setSelectedCommand, selectedSVGElements, setSelectedSVGElements} = useGlobalContext()

	let isDrawing = false
	let lineIndex = 0

	const lineMouseDown = (event: MouseEvent): void => {
		const {offsetX, offsetY} = event
		if(isDrawing){
			isDrawing = false
			return
		}
		lineIndex = svgElements().length
		setSVGElements((svgElements) => [
			...svgElements,
			<line x1={offsetX} y1={offsetY} x2={offsetX} y2={offsetY}/> as SVGLineElement
		])
		isDrawing = true
	}

	function svgLineClicked(event: MouseEvent){
		if(selectedCommand() === 'line') return
		const svgLineElement: SVGLineElement = event.target as SVGLineElement
		if(svgLineElement.getAttribute('stroke') === 'blue'){
			svgLineElement.setAttribute('stroke', 'gray')
			// Remove it from the selected svg elements
		}else{
			svgLineElement.setAttribute('stroke', 'blue')
			setSelectedSVGElements((selectedSVGElements) => {
				return [
					...selectedSVGElements,
					svgLineElement
				]
			})
		}
	}

	const lineMouseMove = (event: MouseEvent): void => {
		if(!isDrawing) return
		const {offsetX, offsetY} = event
		setSVGElements((svgElements) => {
			let x1 = svgElements[lineIndex].x1.baseVal.value
			let y1 = svgElements[lineIndex].y1.baseVal.value
			svgElements[lineIndex] = <line x1={x1} y1={y1} x2={offsetX} y2={offsetY} stroke='gray' stroke-width={3} onClick={svgLineClicked}/> as SVGLineElement
			return [...svgElements]
		})
	}

	function lineClicked(){
		if(selectedCommand() === 'line'){
			setSelectedCommand(null)
			setMouseDown(null)
			setMouseMove(null)
		}else{
			setSelectedCommand('line')
			setMouseDown(() => lineMouseDown)
			setMouseMove(() => lineMouseMove)
		}
	}

	return (
		<button
			onClick={lineClicked}
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				selectedCommand() === 'line' ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={line} class='w-6 h-6'/>
		</button>
	)
}

export default Line