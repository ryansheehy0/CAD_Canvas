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
import Line from './tools/Line'

const Tools: Solid.Component = () => {

	return (
		<div class='w-full aspect-square pr-1 pb-1'>
			<div class='w-full h-full grid grid-cols-6 grid-rows-6 gap-0'>
				<Line />
			</div>
		</div>
	)
}

export default Tools