import Solid, { createEffect, untrack } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import horizontal from "../../assets/constraints/horizontal.svg"
import { Button } from '@/components/ui/button'
import { selectedCommand, setSelectedCommand, setMouseEnterElement, setMouseLeaveElement, setCommandSettings, commandSettings, svgElements, setElementClicked, setSVGElements, elementClicked, mouseEnterElement, mouseLeaveElement } from '@/App'
import { clearSignals, previewSelection, unPreviewSelection, select, unselect, setCommandSettingsProperty, getElementIndex, isSelected } from '@/elementUtilityFunctions'
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '@/components/ui/select'

const Horizontal: Solid.Component = () => {
	// Constraint Logic
	createEffect(() => {
		if(selectedCommand() !== 'horizontal') return
		const lineIndex = commandSettings()?.selectedLineIndex
		if(lineIndex === null) return
		let line: SVGLineElement
		untrack(() => line = svgElements()[lineIndex])
			const x1 = line.x1.baseVal.value
			const y1 = line.y1.baseVal.value
			const x2 = line.x2.baseVal.value
			const y2 = line.y2.baseVal.value
		const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
		const newY2 = y1
		let newX2: number
		if(x1 < x2){
			newX2 = x1 + distance
		}else{
			newX2 = x1 - distance
		}
		setSVGElements((svgElements) => {
			svgElements[lineIndex] = (
				<line x1={x1} y1={y1} x2={newX2} y2={newY2}
				stroke='blue' stroke-width={3} data-selected={"true"}
				onClick={(event: MouseEvent) => elementClicked() ? (elementClicked() as (event: MouseEvent) => void)(event) : undefined}
				onMouseEnter={(event: MouseEvent) => mouseEnterElement() ? (mouseEnterElement() as (event: MouseEvent) => void)(event) : undefined}
				onMouseLeave={(event: MouseEvent) => mouseLeaveElement() ? (mouseLeaveElement() as (event: MouseEvent) => void)(event) : undefined}
				/>
			) as SVGLineElement
			return [...svgElements]
		})
	})

	// Form logic
		// Select line...
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

	function clickLineSelection(index: number){
		if(commandSettings()?.selectedLineIndex === null){
			select(index)
			setCommandSettingsProperty("selectedLineIndex", index)
		}else if(commandSettings()?.selectedLineIndex === index){
			unselect(index)
			setCommandSettingsProperty("selectedLineIndex", null)
		}else{
			unselect(commandSettings()?.selectedLineIndex)
			select(index)
			setCommandSettingsProperty("selectedLineIndex", index)
		}
	}

	// Button clicked
	function horizontalClicked(){
		clearSignals()
		if(selectedCommand() === 'horizontal') return
		setCommandSettings({
			form: (
				<form onSubmit={(event) => {event.preventDefault()}} class='text-black w-full h-1/2'>
					<Select
						value={commandSettings()?.selectedLineIndex}
						placeholder="Select line..."
						options={svgElements().map((_svgElement, index) => `${index}`)}
						itemComponent={props =>
							<SelectItem
								onMouseEnter={() => mouseEnterLineSelection(parseInt(props.item.rawValue))}
								onMouseLeave={() => mouseLeaveLineSelection(parseInt(props.item.rawValue))}
								onClick={() => clickLineSelection(parseInt(props.item.rawValue))}
								item={props.item}>
									{props.item.rawValue}
							</SelectItem>}
					>
						<SelectTrigger>
							<SelectValue<string>>{() => commandSettings()?.selectedLineIndex}</SelectValue>
						</SelectTrigger>
						<SelectContent />
					</Select>
				</form> as HTMLFormElement
			),
			selectedLineIndex: null
		})
		function elementClicked(event: MouseEvent){
			if(isSelected(event)){
				unselect(event)
				setCommandSettingsProperty("selectedLineIndex", null)
			}else{
				if(commandSettings()?.selectedLineIndex === null){
					const elementIndex = getElementIndex(event)
					select(event)
					setCommandSettingsProperty("selectedLineIndex", elementIndex)
				}
			}
		}
		setElementClicked(() => elementClicked)
		setMouseEnterElement(() => previewSelection)
		setMouseLeaveElement(() => unPreviewSelection)
		setSelectedCommand('horizontal')
	}

	return (
		<Button
			onClick={horizontalClicked}
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				selectedCommand() == 'horizontal' ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={horizontal} class='w-6 h-6'/>
		</Button>
	)
}

export default Horizontal