import Solid from 'solid-js'
import Tools from "./Tools"

const SideBar: Solid.Component = () => {
	return (
		<div class='absolute top-0 left-0 w-56 h-screen border border-black'>
			<Tools/>
		</div>
	)
}

export default SideBar