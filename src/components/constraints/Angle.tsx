import Solid, { createSignal } from 'solid-js'
import { twMerge } from 'tailwind-merge'
import angle from '../../assets/constraints/angle.svg'

const Angle: Solid.Component = () => {
	const [isSelected, setIsSelected] = createSignal(false)

	return (
		<button
			onClick={() => setIsSelected((prevIsSelected) => !prevIsSelected)}
			class={twMerge(
				'bg-white border border-black text-black rounded-none w-8 h-8 p-0 m-0 text-base hover:border-black focus:outline-none',
				isSelected() ? "border-2" : "border",
				"flex justify-center items-center")}>
			<img src={angle} class='w-6 h-6'/>
		</button>
	)
}

export default Angle