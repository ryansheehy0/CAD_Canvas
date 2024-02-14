import Solid from 'solid-js'
import { useGlobalContext } from '../App'

const UtilitySideBar: Solid.Component = () => {
	const {commandSettings} = useGlobalContext()

	return (
		<div class='absolute top-0 right-0 w-56 h-screen border-l border-black bg-gray-100'>
			{commandSettings()}
		</div>
	)
}


export default UtilitySideBar