import Solid from 'solid-js'
import { Button } from "../components/ui/button"

const File: Solid.Component = () => {
	return (
		<Button variant='ghost' class='flex-1 h-full hover:bg-white'>
			File
		</Button>
	)
}

export default File