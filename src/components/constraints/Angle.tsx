import Solid, { createEffect } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import angle from '../../assets/constraints/angle.svg'
import { useGlobalContext } from '../../App'

/*
Angle algorithm
	1. Find distance of line you want to rotate
		d = sqrt((xb2 - xb1)^2 + (yb2 - yb1)^2)
	2. Find new slope of line
		m1 = (ya1 - ya2)/(xa1 - xa2)
		m2 = (-m1 - tan(theta))/(m1 * tan(theta) - 1)
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
	const {selectedCommand, setSelectedCommand, setMouseDown, setMouseMove, selectedSVGElements, setSelectedSVGElements, commandSettings, setCommandSettings} = useGlobalContext()

	// Limit the number of selected svg elements to 2 when angle is active
	createEffect(() => {
		if(selectedCommand() !== 'angle') return
		if(selectedSVGElements().length <= 2) return
		setSelectedSVGElements((selectedSVGElements) => selectedSVGElements.slice(0, 2))
	})

	createEffect(() => {
		console.log("test")
		if(selectedCommand() !== 'angle') return
		let theta
		try{
			theta = commandSettings()!.getElementById('angle').value
		}catch(e){return}
		console.log(theta)

		const lineA = selectedSVGElements()[0]
			const xa1 = lineA.x1.baseVal.value
			const ya1 = lineA.y1.baseVal.value
			const xa2 = lineA.x2.baseVal.value
			const ya2 = lineA.y2.baseVal.value
		const lineB = selectedSVGElements()[1]
			const xb1 = lineB.x1.baseVal.value
			const yb1 = lineB.y1.baseVal.value
			const xb2 = lineB.x2.baseVal.value
			const yb2 = lineB.y2.baseVal.value

		const distance = Math.sqrt((xb2 - xb1) ** 2 + (yb2 - yb1) ** 2)
		const m1 = (ya1 - ya2)/(xa1 - xa2)
		const m2 = (-m1 - Math.tan(theta))/(m1 * Math.tan(theta) - 1)
		const xChange = distance / Math.sqrt(m2 ** 2 + 1)
		const newXb2 = xb1 - xChange
		const newYb2 = yb1 - (xChange - m2)

		setSelectedSVGElements((selectedSVGElements) => {
			selectedSVGElements[1] = <line x1={xb1} y1={yb1} x2={newXb2} y2={newYb2} stroke='gray' stroke-width={3} onClick={selectedSVGElements[1].onclick} /> as SVGLineElement
			return selectedSVGElements
		})
	})

	function angleClicked(){
		if(selectedCommand() == 'angle'){
			setSelectedCommand(null)
		}else{
			setSelectedCommand('angle')
			setMouseDown(() => () => {})
			setMouseMove(() => () => {})
			//setSelectedSVGElements([])
			setCommandSettings(() => {
				return (
					<form onSubmit={(event) => {event.preventDefault()}} class='text-black w-full h-1/2'>
						<label for='angle'>Angle: </label>
						<input id='angle' type='number' min={0} max={360} value={72} class='bg-white border-2 border-black focus:outline-none pl-1 w-14'></input>
					</form> as HTMLFormElement
				)
			})
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