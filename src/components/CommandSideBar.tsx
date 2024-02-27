import Solid from 'solid-js'
import File from "./File"
import Settings from './Settings'
import Tools from "./Tools"
import Constraints from './Constraints'
import { Separator } from "../components/ui/separator"

const CommandSideBar: Solid.Component = () => {
	return (
		<div class="absolute top-0 left-0 w-56 h-screen border-r border-black bg-neutral-200">
			<div class='flex h-7'>
				<File />
				<Separator orientation='vertical'/>
				<Settings />
			</div>
			<Separator/>
			<Tools/>
			<Separator/>
			<Constraints />
			<Separator/>
		</div>
	)
}

export default CommandSideBar