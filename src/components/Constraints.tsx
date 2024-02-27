import Solid from 'solid-js'
import Angle from './constraints/Angle'
import Horizontal from './constraints/Horizontal'
import Vertical from './constraints/Vertical'

const Constraints: Solid.Component = () => {

	return (
		<div class='w-full h-52 p-1 my-1 grid grid-cols-6'>
			<Angle />
			<Horizontal />
			<Vertical />
		</div>
	)
}

export default Constraints