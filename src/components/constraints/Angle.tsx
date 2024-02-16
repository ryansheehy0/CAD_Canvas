import Solid, { createEffect } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import angle from '../../assets/constraints/angle.svg'
import { useGlobalContext } from '../../App'
import { selectElement, getSelectedElements } from '../../utilityFunctions'

/*
Angle algorithm
	1. Find distance of line you want to rotate
		d = sqrt((xb2 - xb1)^2 + (yb2 - yb1)^2)
	2. Find new slope of line
		m1 = (ya1 - ya2)/(xa1 - xa2)
		m2 = tan(theta + aTan(m1))
	3. Find new xb2 and yb2
		xChange = d / sqrt(m2^2 + 1)
		newXb2 = xb1 - xChange
		newYb2 = yb1 - (xChange - m2)

Angle command settings
	- Line 1 selection
		- xa1, ya1 and xa2, ya2
	- Line 2 selection
		- xb1, yb1 and xb2, yb2
	- Rotation point
		- xb1, yb1
	- Angle
		- theta
*/

const Angle: Solid.Component = () => {
	const {selectedCommand, setSelectedCommand, setMouseDown, setMouseMove, commandSettings, setCommandSettings, svgElements, setSVGElements} = useGlobalContext()

	// Limit the number of selected svg elements to 2 when angle is active
	/*
	createEffect(() => {
		if(selectedCommand() !== 'angle') return
		if(selectedSVGElements().length <= 2) return
		setSelectedSVGElements((selectedSVGElements) => selectedSVGElements.slice(0, 2))
	})
	*/

	function tanDegrees(degree: number){
		return Math.tan(degree * (Math.PI/180))
	}
	function aTanDegrees(degree: number){
		return Math.atan(degree * (Math.PI/180))
	}

	let prevAngle = 0
	createEffect(() => {
		if(selectedCommand() !== 'angle') return
		if(selectedSVGElements().length !== 2) return

		let theta: number
		try{
			theta = (commandSettings()?.form!.querySelector("#angle") as HTMLInputElement)?.valueAsNumber
		}catch(e){return}

		if(theta === prevAngle) return
		prevAngle = theta

		const lineA = selectedSVGElements()[0]
			const xa1 = lineA.x1.baseVal.value
			const ya1 = lineA.y1.baseVal.value
			const xa2 = lineA.x2.baseVal.value
			const ya2 = lineA.y2.baseVal.value
			console.log(xa1, ya1, xa2, ya2)
		const lineB = selectedSVGElements()[1]
			const xb1 = lineB.x1.baseVal.value
			const yb1 = lineB.y1.baseVal.value
			const xb2 = lineB.x2.baseVal.value
			const yb2 = lineB.y2.baseVal.value

		const distance = Math.sqrt((xb2 - xb1) ** 2 + (yb2 - yb1) ** 2)
		const m1 = (ya1 - ya2)/(xa1 - xa2)
		const m2 = tanDegrees(theta + aTanDegrees(m1))
		let xChange = distance / Math.sqrt(m2 ** 2 + 1)

		const asymptote1 = 90 - aTanDegrees(m1)
		const asymptote2 = 180 + asymptote1

		let newXb2: number
		let newYb2: number

		if(theta === asymptote1){
			newXb2 = xb1
			newYb2 = yb1 - distance
		}else if(theta === asymptote2){
			newXb2 = xb1
			newYb2 = yb1 + distance
		}else{
			if(theta < asymptote1 || theta > asymptote2){
				xChange *= -1
			}
			newXb2 = xb1 + xChange
			newYb2 = yb1 + (xChange * m2)
		}

		console.log("Selected SVG Elements", selectedSVGElements())
		console.log("SVG Elements", svgElements())

		const svgElementIndex = svgElements().findIndex((svgElement) => svgElement !== selectedSVGElements()[0])
		console.log(xb1, yb1, xb2, yb2)
		console.log(svgElements()[svgElementIndex])

		setSVGElements((svgElements) => {
			//const onClickFunction = svgElements[svgElementIndex].onclick
			//onClick={() => {onClickFunction!}}
			svgElements[svgElementIndex] = <line x1={xb1} y1={yb1} x2={newXb2} y2={newYb2} stroke='gray' stroke-width={3} onClick={selectElement}/> as SVGLineElement
			return [...svgElements]
		})

		// Not correctly selected line.
		// Selecting lines after they are changed
	})

	function angleClicked(){
		if(selectedCommand() == 'angle'){
			setSelectedCommand(null)
		}else{
			setMouseDown(() => () => {})
			setMouseMove(() => () => {})
			//setSelectedSVGElements([])
			setCommandSettings({
				form: (
					<form onSubmit={(event) => {event.preventDefault()}} class='text-black w-full h-1/2'>
						<label for='angle'>Angle: </label>
						<input id='angle' type='number' min={0} max={360} value={commandSettings()?.angle}
							onInput={(event) => {
								setCommandSettings((commandSettings) => {
									return {
										form: commandSettings!.form,
										angle: parseInt(event.target.value)
									}
								})
							}}
						class='bg-white border-2 border-black focus:outline-none pl-1 w-14'></input>
					</form> as HTMLFormElement
				),
				angle: 90
			})
			setSelectedCommand('angle')
		}
	}

	return (
		<button
			onClick={angleClicked}
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				selectedCommand() == 'angle' ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={angle} class='w-6 h-6'/>
		</button>
	)
}

export default Angle