import { SVGElements, svgElements, setSVGElements, svgRef, selectedCommand } from "./App"

export function selectElement(event: MouseEvent): void{
	if(selectedCommand() === 'line') return
	const element = event.target as SVGElements
	const svgElementIndex = svgElements().findIndex((svgElement) => svgElement === element)

	const selected = element.dataset?.selected
	if(selected === "true"){
		setSVGElements((svgElements) => {
			svgElements[svgElementIndex].dataset.selected = "false"
			svgElements[svgElementIndex].setAttribute('stroke', 'blue')
			return [...svgElements]
		})
	}else{
		setSVGElements((svgElements) => {
			svgElements[svgElementIndex].dataset.selected = "true"
			svgElements[svgElementIndex].setAttribute('stroke', 'gray')
			return [...svgElements]
		})
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

	let selectedElements: SVGElements[] = []
	for(const svgElement of svgElements()){
		if(svgElement.getAttribute("stroke") === 'blue'){
			selectedElements.push(svgElement)
		}
	}
	return selectedElements

}