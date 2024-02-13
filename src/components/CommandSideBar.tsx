import Solid from 'solid-js'
import File from "./File"
import Settings from './Settings'
import Tools from "./Tools"
import Constraints from './Constraints'

const CommandSideBar: Solid.Component = () => {
	return (
		<div class='absolute top-0 left-0 w-56 h-screen border-r border-black bg-gray-100'>
			<div class='flex'>
				<File /> <Settings />
			</div>
			<hr class='h-px bg-black border-none'></hr>
			<Tools/>
			<hr class='h-px bg-black border-none'></hr>
			<Constraints />
			<hr class='h-px bg-black border-none'></hr>
		</div>
	)
}

export default CommandSideBar