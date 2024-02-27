import Solid from 'solid-js'
import { selectedCommand, setSelectedCommand, setMouseDown, setMouseMove, svgElements, setSVGElements, elementClicked, mouseEnterElement, mouseLeaveElement } from '../../App'
import line from "../../assets/tools/line.svg"
import { twMerge } from 'tailwind-merge'
import { Button } from "../../components/ui/button"
import { clearSignals } from '../../utilityFunctions'

const Line: Solid.Component = () => {
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

	const lineMouseMove = (event: MouseEvent): void => {
		if(!isDrawing) return
		const {offsetX, offsetY} = event
		setSVGElements((svgElements) => {
			let x1 = svgElements[lineIndex].x1.baseVal.value
			let y1 = svgElements[lineIndex].y1.baseVal.value
			svgElements[lineIndex] = (
				<line x1={x1} y1={y1} x2={offsetX} y2={offsetY}
					stroke='gray' stroke-width={3} data-selected={"false"}
					onClick={(event: MouseEvent) => elementClicked() ? (elementClicked() as (event: MouseEvent) => void)(event) : undefined}
					onMouseEnter={(event: MouseEvent) => mouseEnterElement() ? (mouseEnterElement() as (event: MouseEvent) => void)(event) : undefined}
					onMouseLeave={(event: MouseEvent) => mouseLeaveElement() ? (mouseLeaveElement() as (event: MouseEvent) => void)(event) : undefined}
				/>
			) as SVGLineElement
			return [...svgElements]
		})
	}

	function lineClicked(){
		if(selectedCommand() === 'line') return clearSignals()
		clearSignals()
		setMouseDown(() => lineMouseDown)
		setMouseMove(() => lineMouseMove)
		setSelectedCommand('line')
	}

	return (
		<div class='w-full aspect-square pt-1 pl-1'>
			<Button
				onClick={lineClicked}
				class={twMerge(
					'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
					selectedCommand() === 'line' ? "border-2" : "border",
					"flex justify-center items-center")}>
				<img src={line} class='w-6 h-6'/>
			</Button>
		</div>
	)
}

export default Line