import Solid from 'solid-js'
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
		xb2 = xb1 - xChange
		yb2 = yb1 - (xChange - m2)

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
	const {selectedCommand, setSelectedCommand, setMouseDown, setMouseMove} = useGlobalContext()

	/*
		- Add mouseEnter event listeners to added lines
		- Add context signal for mouseEnter onClick function
	*/

	function angleClicked(){
		if(selectedCommand() == 'angle'){
			setSelectedCommand(null)
		}else{
			setSelectedCommand('angle')
			setMouseDown(null)
			setMouseMove(null)
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