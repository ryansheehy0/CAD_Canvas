import Solid from 'solid-js'
import { Button } from "@/components/ui/button"

const Settings: Solid.Component = () => {
	/*
		<button class='w-1/2 border-0 border-r border-black hover:border-black focus:outline-none bg-gray-100 text-black p-0 m-0 rounded-none'>Settings</button>
	*/
	return (
		<Button variant='ghost' class='flex-1'>
			Settings
		</Button>
	)
}

export default Settings