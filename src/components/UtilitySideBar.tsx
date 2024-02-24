import Solid from 'solid-js'
import { commandSettings } from '../App'

const UtilitySideBar: Solid.Component = () => {
	return (
		<div class='absolute top-0 right-0 w-56 h-screen border-l border-black bg-gray-100'>
			{commandSettings()?.form}
		</div>
	)
}

export default UtilitySideBar