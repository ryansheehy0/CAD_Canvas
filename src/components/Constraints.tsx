import Solid from 'solid-js'
import Angle from './constraints/Angle'
import Horizontal from './constraints/Horizontal'

const Constraints: Solid.Component = () => {

	return (
		<div class='w-full h-52 p-1 my-1 grid grid-cols-6'>
			<Angle />
			<Horizontal />
		</div>
	)
}

export default Constraints