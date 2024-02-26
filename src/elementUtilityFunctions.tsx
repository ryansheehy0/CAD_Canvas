import { SVGElements, svgElements, setSVGElements, svgRef, setCommandSettings, CommandSettings, setSelectedCommand, setMouseDown, setMouseMove, setElementClicked, setMouseEnterElement, setMouseLeaveElement } from "./App"

// Selection functions
export function select(indexOrEvent: number | MouseEvent): void{
	let elementIndex = getElementIndex(indexOrEvent)
	setSVGElements((svgElements) => {
		svgElements[elementIndex].dataset.selected = "true"
		svgElements[elementIndex].setAttribute('stroke', 'blue')
		return [...svgElements]
	})
}

export function unselect(indexOrEvent: number | MouseEvent): void{
	let elementIndex= getElementIndex(indexOrEvent)
	setSVGElements((svgElements) => {
		svgElements[elementIndex].dataset.selected = "false"
		svgElements[elementIndex].setAttribute('stroke', 'gray')
		return [...svgElements]
	})
}

export function toggleSelection(indexOrEvent: number | MouseEvent): void{
	if(isSelected(indexOrEvent)){
		unselect(indexOrEvent)
	}else{
		select(indexOrEvent)
	}
}

export function unselectAll(): void{
	for(let i = 0; i < svgElements().length; i++){
		unselect(i)
	}
}

function getSelectedElements(): SVGElements[]{
	return [...svgRef.querySelectorAll<SVGElements>('[data-selected="true"]')]
}

export function getNumberOfSelections(): number{
	return getSelectedElements().length
}

export function isSelected(indexOrEvent: number | MouseEvent){
	const elementIndex = getElementIndex(indexOrEvent)
	const element = svgElements()[elementIndex]
	const selected = element.dataset?.selected
	if(selected === "true"){
		return true
	}else{
		return false
	}
}

// Preview selection functions
export function previewSelection(indexOrEvent: number | MouseEvent): void{
	const elementIndex = getElementIndex(indexOrEvent)
	svgElements()[elementIndex].setAttribute('stroke', 'yellow')
}

export function unPreviewSelection(indexOrEvent: number | MouseEvent): void{
	const elementIndex = getElementIndex(indexOrEvent)
	const element = svgElements()[elementIndex]
	const selected = element.dataset?.selected
	if(selected === "true"){
		element.setAttribute('stroke', 'blue')
	}else{
		element.setAttribute('stroke', 'gray')
	}
}

// Other
function elementIndexFromEvent(event: MouseEvent): number{
	const element = event.target as SVGElements
	return svgElements().findIndex((svgElement) => svgElement === element)
}

export function getElementIndex(indexOrEvent: number | MouseEvent): number{
	if(typeof indexOrEvent === "number"){
		return indexOrEvent
	}

	return elementIndexFromEvent(indexOrEvent)
}

export function setCommandSettingsProperty(property: string, value: any){
	setCommandSettings((commandSettings) => {
		return {
			...commandSettings,
			[property]: value
		} as CommandSettings
	})
}

export function clearSignals(): void{
	setSelectedCommand(null)
  // SVG canvas signals
	setMouseDown(null)
	setMouseMove(null)
  // Utility side bar
	setCommandSettings(null)
  // Element event functions
	setElementClicked(null)
	setMouseEnterElement(null)
	setMouseLeaveElement(null)
	unselectAll()
}

/*
Order by which signals are set for each command
	clearSignals
	// If you want to set the utility side bar
		setCommandSettings
	// If you want to draw a svg element on the canvas
		setMouseMove
		SetMouseDown
	// If you want element selection when clicked
		setElementClicked
		setMouseEnterElement
		setMouseLeaveElement
	setSelectedCommand
*/