import { SVGElements, svgElements, setSVGElements, svgRef, selectedCommand } from "./App"

export function selectElement(elementIndex: number){
	setSVGElements((svgElements) => {
		svgElements[elementIndex].dataset.selected = "true"
		svgElements[elementIndex].setAttribute('stroke', 'blue')
		return [...svgElements]
	})
}

export function unselectElement(elementIndex: number){
	setSVGElements((svgElements) => {
		svgElements[elementIndex].dataset.selected = "false"
		svgElements[elementIndex].setAttribute('stroke', 'gray')
		return [...svgElements]
	})
}

export function toggleElementSelection(event: MouseEvent): void{
	if(selectedCommand() === 'line') return
	const element = event.target as SVGElements
	const svgElementIndex = svgElements().findIndex((svgElement) => svgElement === element)

	const selected = element.dataset?.selected
	if(selected === "true"){
		unselectElement(svgElementIndex)
	}else{
		selectElement(svgElementIndex)
	}
}

export function mouseEnterElement(event: MouseEvent): void{
	if(selectedCommand() === 'line') return
	const element = event.target as SVGElements
	element.setAttribute('stroke', 'yellow')
}

export function mouseLeaveElement(event: MouseEvent): void{
	if(selectedCommand() === 'line') return
	const element = event.target as SVGElements

	const selected = element.dataset?.selected
	if(selected === "true"){
		element.setAttribute('stroke', 'blue')
	}else{
		element.setAttribute('stroke', 'gray')
	}
}

export function getSelectedElements(): SVGElements[]{
	return [...svgRef.querySelectorAll<SVGElements>('[data-selected="true"]')]
}