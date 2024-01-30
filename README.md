# CAD Canvas

A 2d CAD software for note taking, making diagrams/logos, and designing with percussion.

Combine the precision drawing of 2d cad programs like Fusion 360's sketching, with note taking and coloring capabilities like Notability.

## Final Product
- Timeline of events that can be undone.
- Tabs for different pages
- Close without saving warning

### Drawing tools
- Line
- Rectangle
	- Rounded rectangle
- Polygon
- Circle
	- Circular arch
	- Slot
- Ellipse
	- Elliptical arch
- Text
- Point
- Freehand
- Splines
	- Catmull-Rom spline
	- Natural cubic spline
	- B-spline

### Settings for all tools
- Construction or not
- Line width
- Line styling
- Line color
- Rounded edges

### Constraints
- Angle
	- 90, 45
- X-axis
- Y-axis
- Tangent
- Lock(Don't allow it to be dragged around)
- Dimension
	- X-axis dimension
	- y-axis dimension
- Point to line
- Point to point
- Parallel
- Dimensional equality
- Radius/Diameter

### Operations
- Close loop nicely
- Close loop with line
- Fill selected area
- Change text to lines
- Chamfer
- Fillet
- Change segment
	- Split segment
		- 1/2, 1/3, etc
	- Extend edge
	- Trim edge
- Modify operations
	- Rotate
	- Copy
	- Move
	- Scale
	- Mirror
- Click to background grid or not

### Components
Components are pages you can save and then be able to use in other pages. Like reusable parts.
- Allow for text variables that get filled out when you place the component.
	- Like Sigma notation in math

### File
- Export
- Save(Custom file type)
- Open
- Import image

### Settings
- Time interval to automatically save to database
	- Whenever there is a change
- Background color
- Page dimensions
	- Work done on infinite grid, but can click to page outline.
- Default settings for tools
	- Default line width
	- Default line styling
	- Default line color
	- Default units
	- Default lines per round segment

## Minimum Viable Product 1
1. Draw line
1. Constrain the angle between lines
1. Constrain a line to the X and Y axes