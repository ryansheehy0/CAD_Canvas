/*
 * This file is part of CAD Canvas.
 *
 * CAD Canvas is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * CAD Canvas is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with CAD Canvas. If not, see <https://www.gnu.org/licenses/>.
 */

import Solid from 'solid-js'
import { commandSettings } from '../App'

const UtilitySideBar: Solid.Component = () => {
	return (
		<div class='absolute top-0 right-0 w-56 h-screen border-l border-black bg-neutral-200 p-2'>
			{commandSettings()?.form}
		</div>
	)
}

export default UtilitySideBar