import Solid from 'solid-js'
import Line from './tools/Line'

const Tools: Solid.Component = () => {

	return (
		<div class='w-full aspect-square pr-1 pb-1'>
			<div class='w-full h-full grid grid-cols-6 grid-rows-6 gap-0'>
				<Line />
			</div>
		</div>
	)
}

export default Tools