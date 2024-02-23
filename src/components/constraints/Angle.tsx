import Solid, { createEffect } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import angle from '../../assets/constraints/angle.svg'
import { useGlobalContext, CommandSettings } from '../../App'
import { toggleElementSelection, unselectElement, mouseEnterElement, mouseLeaveElement, selectElement } from '../../elementUtilityFunctions'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const Angle: Solid.Component = () => {
	const {selectedCommand, setSelectedCommand, setMouseDown, setMouseMove, commandSettings, setCommandSettings, svgElements, setSVGElements} = useGlobalContext()

	function tanDegrees(degree: number){
		return Math.tan(degree * (Math.PI/180))
	}
	function aTanDegrees(num: number){
		return Math.atan(num) * (180/Math.PI)
	}

	let prevAngle = 0
	createEffect(() => {
		if(selectedCommand() !== 'angle') return

		const lineAIndex = commandSettings()?.selectedLineAIndex
		const lineBIndex = commandSettings()?.selectedLineBIndex
		if(lineAIndex === null || lineBIndex === null) return

		const theta = commandSettings()?.angle
		if(theta === prevAngle) return
		prevAngle = theta
		if(theta < 0 || theta > 360 || Number.isNaN(theta)) return

		const lineA = svgElements()[lineAIndex]
			const xa1 = lineA.x1.baseVal.value
			const ya1 = lineA.y1.baseVal.value
			const xa2 = lineA.x2.baseVal.value
			const ya2 = lineA.y2.baseVal.value
		const lineB = svgElements()[lineBIndex]
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
			svgElements[lineBIndex] = <line x1={xb1} y1={yb1} x2={newXb2} y2={newYb2} stroke='blue' stroke-width={3} data-selected={"true"} onClick={toggleElementSelection} onMouseEnter={mouseEnterElement} onMouseLeave={mouseLeaveElement} /> as SVGLineElement
			return [...svgElements]
		})
	})

	function mouseEnterLineSelection(index: number){
		const mouseEnterEvent = new MouseEvent('mouseenter', {
			view: window,
			bubbles: true,
			cancelable: false
		})
		svgElements()[index].dispatchEvent(mouseEnterEvent)
	}

	function mouseLeaveLineSelection(index: number){
		const mouseLeaveEvent = new MouseEvent('mouseleave', {
			view: window,
			bubbles: true,
			cancelable: false
		})
		svgElements()[index].dispatchEvent(mouseLeaveEvent)
	}

	function clickLineSelection(index: number, lineAOrB: "A" | "B"){
		if(lineAOrB === "A"){
			if(commandSettings()?.selectedLineAIndex === null){
				selectElement(index)
				setCommandSettings((commandSettings) => {
					return {
						...commandSettings,
						selectedLineAIndex: index,
					} as CommandSettings
				})
			}else if(commandSettings()?.selectedLineAIndex === index){
				unselectElement(index)
				setCommandSettings((commandSettings) => {
					return {
						...commandSettings,
						selectedLineAIndex: null,
					} as CommandSettings
				})
			}else{
				unselectElement(commandSettings()?.selectedLineAIndex)
				selectElement(index)
				setCommandSettings((commandSettings) => {
					return {
						...commandSettings,
						selectedLineAIndex: index,
					} as CommandSettings
				})
			}
		}else{
			if(commandSettings()?.selectedLineBIndex === null){
				selectElement(index)
				setCommandSettings((commandSettings) => {
					return {
						...commandSettings,
						selectedLineBIndex: index,
					} as CommandSettings
				})
			}else if(commandSettings()?.selectedLineBIndex === index){
				unselectElement(index)
				setCommandSettings((commandSettings) => {
					return {
						...commandSettings,
						selectedLineBIndex: null,
					} as CommandSettings
				})
			}else{
				unselectElement(commandSettings()?.selectedLineBIndex)
				selectElement(index)
				setCommandSettings((commandSettings) => {
					return {
						...commandSettings,
						selectedLineBIndex: index,
					} as CommandSettings
				})
			}
		}

		setTimeout(() => {
			// This delay is there to clear any mouse enter events that fire after the click
			for(const svgElement of svgElements()){
				const mouseLeaveEvent = new MouseEvent('mouseleave', {
					view: window,
					bubbles: true,
					cancelable: false
				})
				svgElement.dispatchEvent(mouseLeaveEvent)
			}
		}, 400)
	}

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
							placeholder="Select line A..."
							options={svgElements().map((_svgElement, index) => `${index}`).filter((svgElementIndex) => svgElementIndex !== commandSettings()?.selectedLineBIndex?.toString())}
							itemComponent={props =>
								<SelectItem
									onMouseEnter={() => mouseEnterLineSelection(parseInt(props.item.rawValue))}
									onMouseLeave={() => mouseLeaveLineSelection(parseInt(props.item.rawValue))}
									onClick={() => clickLineSelection(parseInt(props.item.rawValue), "A")}
									item={props.item}>
										{props.item.rawValue}
								</SelectItem>}
						>
							<SelectTrigger>
								<SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
							</SelectTrigger>
							<SelectContent />
						</Select>

						<Select
							placeholder="Select line B..."
							options={svgElements().map((_svgElement, index) => `${index}`).filter((svgElementIndex) => svgElementIndex !== commandSettings()?.selectedLineAIndex?.toString())}
							itemComponent={props =>
								<SelectItem
									onMouseEnter={() => mouseEnterLineSelection(parseInt(props.item.rawValue))}
									onMouseLeave={() => mouseLeaveLineSelection(parseInt(props.item.rawValue))}
									onClick={() => clickLineSelection(parseInt(props.item.rawValue), "B")}
									item={props.item}>
										{props.item.rawValue}
								</SelectItem>
							}
						>
							<SelectTrigger>
								<SelectValue<string>>{(state) => state.selectedOption()}</SelectValue>
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
										...commandSettings,
										angle: event.target.valueAsNumber
									} as CommandSettings
								})
							}}
						class='bg-white border-2 border-black focus:outline-none pl-1 w-3/4'></input>
					</form> as HTMLFormElement
				),
				angle: 90.0,
				selectedLineAIndex: null,
				selectedLineBIndex: null
			})
			setSelectedCommand('angle')
		}
	}

	return (
		<Button
			onClick={angleClicked}
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				selectedCommand() == 'angle' ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={angle} class='w-6 h-6'/>
		</Button>
	)
}

export default Angle