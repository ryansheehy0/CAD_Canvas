import Solid from 'solid-js'
import Angle from './constraints/Angle'
import Horizontal from './constraints/Horizontal'
import Vertical from './constraints/Vertical'

const Constraints: Solid.Component = () => {

	return (
		<div class='w-full aspect-square pr-1 pb-1'>
			<div class='w-full h-full grid grid-cols-6 grid-rows-6 gap-0'>
				<Angle />
				<Horizontal />
				<Vertical />
			</div>
		</div>
	)
}

export default Constraints