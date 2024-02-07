import Solid from 'solid-js'
import File from "./File"
import Tools from "./Tools"
import Constraints from './Constraints'

const SideBar: Solid.Component = () => {
	return (
		<div class='absolute top-0 left-0 w-56 h-screen border-r border-black bg-white'>
			<File />
			<hr class='h-px bg-black border-none'></hr>
			<Tools/>
			<hr class='h-px bg-black border-none'></hr>
			<Constraints />
			<hr class='h-px bg-black border-none'></hr>
		</div>
	)
}

export default SideBar