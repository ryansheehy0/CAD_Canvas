import Solid from 'solid-js'
import { Button } from "@/components/ui/button"

const File: Solid.Component = () => {

		/*
		<button class='w-1/2 border-0 border-r border-black hover:border-black focus:outline-none bg-gray-100 text-black p-0 m-0 rounded-none'>File</button>
	*/
	return (
		<Button variant='ghost' class='w-1/2'>
			File
		</Button>
	)
}

export default File