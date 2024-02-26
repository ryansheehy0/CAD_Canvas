# CAD Canvas

A 2d CAD software for note taking, creating diagrams, and making logos.

Combine the precision drawing of 2d cad programs like Fusion 360's sketching, with note taking and coloring capabilities like Notability.

An SVG editor in the style of 2d CAD.

Useful for desktop(mouse and keyboard) instead of tablets(touch).

How is it different from inkscape?
- Faster designing because of constraints and dimensions. Things snap to where they are supposed to be.
- Can produce dimensionally accurate logos
- Can produce logos which have each element constrained to one another
	- No need to manually line lines together
	- https://www.youtube.com/watch?v=I-6ljbgstl8
- Can save and re-use components
- Run on the web

Maybe focus more on making note taking diagrams rather than making logos/icons.
- Would probably want to include some animation capabilities.

## Final Product
- Timeline of events that can be undone.
- Tabs for different pages
- Close without saving warning
- Change color of lines when fully defined
	- Have a color view and a designing view
- When you have 2 lines on top of each other you can right click and select which line you want
- You can never have 2 or more points in the same position. They will be automatically joined.
- Create animations with constraints
	- Maybe not include. Feature creep
- Can have multiple layers and hide and un-hide different layers(Maybe not include. Is it really necessary?)
	- Can move components between layers
	- Maybe not include. Feature creep
- Supports CMYK colors for print color accuracy
- Used to make simple logos. Not really advanced features like with inkscape.
- (Definitely include)variables for different dimensions

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
- Equation
	- Type equation and it graphs it out. Define scale, constraints in x and y

### Settings for all tools
- Construction or not
- Line width
- Line styling
- Line color
- Rounded ends

### Constraints
- Angle
	- Parallel(Don't need to include)(0, 180, or 360 degrees)
	- Perpendicular(Don't need to include)(90 or 270 degrees)
- X-axis/Horizontal
- Y-axis/Vertical
- Point to line
- Point to point
- Tangent
- Equality
- Dimension between points
	- X-axis/horizontal dimension between points
	- y-axis/vertical dimension between points
	- Radius/Diameter
- Lock(Don't allow it to be dragged around)
- Concentric(Align center of circles)
- Colinear(Makes 2 lines parallel and in the same position)
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
1. Select lines
1. Constrain the angle between lines
1. Constrain a line to the X and Y axes

line colors
- Fully constrained: black
- Not constrained: gray
- Selected: blue
- Constructed: dashed 4 4

## Should be able to replicate in software
![poster_example](./poster_example.png)