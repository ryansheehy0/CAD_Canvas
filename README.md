# CAD Canvas

A 2d CAD software for note taking, creating diagrams, and making logos.

Combine the precision drawing of 2d cad programs like Fusion 360's sketching, with note taking and coloring capabilities like Notability.

## Final Product
- Timeline of events that can be undone.
- Tabs for different pages
- Close without saving warning
- Change color of lines when fully defined
	- Have a color view and a designing view
- When you have 2 lines on top of each other you can right click and select which line you want

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
- Catmull-Rom spline
- Natural cubic spline
- B-spline

### Settings for all tools
- Construction or not
- Line width
- Line styling
- Line color
- Rounded ends

### Constraints
- Angle
	- Parallel
	- Perpendicular
- X-axis/Horizontal
- Y-axis/Vertical
- Point to line
- Point to point
- Tangent
- Equality
- Dimension
	- X-axis/horizontal dimension
	- y-axis/vertical dimension
	- Radius/Diameter
- Lock(Don't allow it to be dragged around)
- Concentric(Align center of circles)
- Colinear(Makes 2 lines parallel and int he same position)
- Symmetric(Makes 2 objects symmetric across a line)
- Curvature(G2 curvature)

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
- Color view or design view
	- Design view allows you to see constrains, construction lines, whether lines have any degrees of freedom, and defined dimensions.
	- Color view allows you to just see the line colors and filled in areas.

### Components
Components are pages you can save and then be able to use in other pages. Like reusable parts.
- Allow for text variables that get filled out when you place the component.
	- Like Sigma notation in math

### File
- Export
	- svg, pdf, png, jpeg
- Save(Custom file type)
- Open
- Import image

### Settings
- Time interval to automatically save to database
	- Whenever there is a change
- Background color
- Page dimensions
	- Work done on canvas dimensions, but can click to page outline.
	- Used for exporting
- Canvas dimensions
	- Not infinite, but very large
- Default settings for tools
	- Default line width
	- Default line styling
	- Default line color
	- Default units
	- Default lines per round segment
- Dark and light theme

### Keyboard shortcuts

## Minimum Viable Product 1
1. Draw line
1. Constrain the angle between lines
1. Constrain a line to the X and Y axes