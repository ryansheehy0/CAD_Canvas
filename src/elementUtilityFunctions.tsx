import { SVGElements, svgElements, setSVGElements, svgRef } from "./App"

let numberOfSelections: number | null = null

// Selection functions
export function select(indexOrEvent: number | MouseEvent): void{
	if(numberOfSelections){
		if(getNumberOfSelections() >= numberOfSelections) return
	}

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
		unselectElement(i)
	}
}

export function limitNumberOfSelections(num: number): void{
	numberOfSelections = num
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