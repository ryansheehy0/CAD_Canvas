import Solid, { createEffect, For } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import angle from '../../assets/constraints/angle.svg'
import { useGlobalContext, SVGElements } from '../../App'
import { selectElement, getSelectedElements, mouseEnterElement, mouseLeaveElement } from '../../utilityFunctions'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"

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
	function aTanDegrees(num: number){
		return Math.atan(num) * (180/Math.PI)
	}

	let prevAngle = 0
	createEffect(() => {
		if(selectedCommand() !== 'angle') return
		const selectedElements = getSelectedElements()
		let svgElementIndex = svgElements().findIndex((svgElement) => svgElement !== selectedElements[0])
		if(selectedElements.length !== 2) return

		const theta = commandSettings()?.angle
		if(theta === prevAngle) return
		prevAngle = theta
		if(theta < 0 || theta > 360 || Number.isNaN(theta)) return

		const lineA = selectedElements[0]
			const xa1 = lineA.x1.baseVal.value
			const ya1 = lineA.y1.baseVal.value
			const xa2 = lineA.x2.baseVal.value
			const ya2 = lineA.y2.baseVal.value
		const lineB = selectedElements[1]
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

		setSVGElements((svgElements) => {
			svgElements[svgElementIndex] = <line x1={xb1} y1={yb1} x2={newXb2} y2={newYb2} stroke='blue' stroke-width={3} data-selected={"true"} onClick={selectElement} onMouseEnter={mouseEnterElement} onMouseLeave={mouseLeaveElement} /> as SVGLineElement
			return [...svgElements]
		})
	})

	/*
						<label for="lineA">Selected lin A: </label>
						<select id="lineA" onMouseEnter={() => console.log("Hovering")}>
							<option onMouseEnter={() => console.log("Hovering")} value={`x1:${svgElements()[0].x1.baseVal.value} y1:${svgElements()[0].y1.baseVal.value} x2:${svgElements()[0].x2.baseVal.value} y2:${svgElements()[0].y2.baseVal.value}`}>{`x1:${svgElements()[0].x1.baseVal.value} y1:${svgElements()[0].y1.baseVal.value} x2:${svgElements()[0].x2.baseVal.value} y2:${svgElements()[0].y2.baseVal.value}`}</option>
							<option onMouseEnter={() => console.log("Hovering")} value={`x1:${svgElements()[1].x1.baseVal.value} y1:${svgElements()[1].y1.baseVal.value} x2:${svgElements()[1].x2.baseVal.value} y2:${svgElements()[1].y2.baseVal.value}`}>{`x1:${svgElements()[1].x1.baseVal.value} y1:${svgElements()[1].y1.baseVal.value} x2:${svgElements()[1].x2.baseVal.value} y2:${svgElements()[1].y2.baseVal.value}`}</option>

							{/*
							{svgElements().map(item => (
								<option value={`x1:${item.x1} y1:${item.y1} x2:${item.x2} y2:${item.y2}`}>{item}</option>
							))}
							}
							{/*
							<For each={svgElements()}>
								{(item: SVGElements) => <option value={`x1:${item.x1} y1:${item.y1} x2:${item.x2} y2:${item.y2}`}>{item}</option> }
							</For>
							}

	*/

	function angleClicked(){
		if(selectedCommand() == 'angle'){
			setSelectedCommand(null)
		}else{
			setMouseDown(() => () => {})
			setMouseMove(() => () => {})
			setCommandSettings({
				form: (
					<form onSubmit={(event) => {event.preventDefault()}} class='text-black w-full h-1/2'>
					<Select
						options={["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"]}
						itemComponent={props => <SelectItem item={props.item}>{props.item.rawValue}</SelectItem>}
					>
						<SelectTrigger>
							<SelectValue<string>>{state => state.selectedOption()}</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>

						<label for='angle'>Angle: </label>
						<input id='angle' type='number' step="any" min={0} max={360} value="90"
							onInput={(event) => {
								// commandSettings()?.angle % 1 > 0 ? commandSettings()?.angle : commandSettings()?.angle.toFixed(1)
									// this allows you to change commandSettings().angle and it updates the angle in the form input.
								setCommandSettings((commandSettings) => {
									return {
										form: commandSettings!.form,
										angle: event.target.valueAsNumber
									}
								})
							}}
						class='bg-white border-2 border-black focus:outline-none pl-1 w-3/4'></input>
					</form> as HTMLFormElement
				),
				angle: 90.0
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