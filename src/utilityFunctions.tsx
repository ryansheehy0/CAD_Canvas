import { SVGElements, svgElements } from "./App"

export function selectElement(event: MouseEvent): void{
	const line = (event.target as SVGLineElement)
	const currentColor = line.getAttribute('stroke')
	if(currentColor === 'gray'){
		line.setAttribute('stroke', 'blue')
	}else if(currentColor === 'blue'){
		line.setAttribute('stroke', 'gray')
	}
}

export function getSelectedElements(): SVGElements[]{
	return svgElements().querySelectorAll('[stroke="blue"]')

	let selectedElements: SVGElements[] = []
	for(const svgElement of svgElements()){
		if(svgElement.getAttribute("stroke") === 'blue'){
			selectedElements.push(svgElement)
		}
	}
	return selectedElements

}