[Demo (In development, may not work)](https://wonderful-dubinsky-e2d239.netlify.com/)

# Notes:

## Map Editor:
    Requirements:
        - Specify world dimensions in cell units.
        - ~~Cells are selectable~~
        - Cells display a top down preview of the texture they contain. Walls with multiple faces will have to show each separately. Ceilings can perhaps be toggled on and off.
        - Selecting a cell brings up a cell editor
        - A cell editor lets you choose what type of cell it is (Floor or Wall, ceiling or not, multiple faces).
        - A cell editor let's you choose the trigger type for the cell (or face in the case of walls).
        - Changing anything about the world must be validated against the player's location.
        - The player location and direction should be able to be changed. (Maybe FOV too).
        - You should be able to load in new textures.
        - You should be able to create new static sprites.
        - You should be able to place sprites.
        - You should be able to scale sprites.
        - You should be able to adjust the vertical offset of sprites.
        - You should be able to toggle sprites in the view (and POV display)
        - You should be able to add and toggle a sky texture
        - You should be able to add a sky gradient.
        - Add a toggle for clipping mode.
    Wish list:
        - Select multiple cells
        - Sprite creator in situ.
        - Change map dimensions after inital generation

    Thoughts:
        - Do we want to do this in-engine or not? I would venture that the ideal scenario would allow for split-screen editing with a live in-game rendered, fully controllable instance of the game also running side by side.  Right now the game loads a wad on instantiation but we'll need to make WAD files hot swappable.
        - If we want to run the builder in something like react (or vue), we'll need a way to share state with the game instance. For example, we could use a global store outside the instance of the react app and the game. The game can listen to an event subscriber on startup and reload the WAD when an update is published.

## Editor Arch:
Stack:

I think for expediency, it makes sense to do this in React. I'd prefer not to, but it's likely the way I'll be most productive. To that same effect, I would probably just go ahead and stick with redux rather than rolling my own state system.

Parts (high level):

- A grid generator (specify height and width). 
    - We can start by making this a one time affair, enter w/h then a grid is generated, but I'd prefer to have this editable on the fly. That does however bring with it complications. Perhaps being able to crop and expand in a non destructive but selective way would ultimately work better. For now, however, nope.
- A player editor. For now just the coordinates and direction, later the FOV as well.
- A sky editor (add texture or specify gradient stops)
- Set a default floor tile (or a fallback gradient (when I implement that)).
- A grid with interactive cells. First pass clicking a cell will bring up a cell editor, but later iterations could have click and drag and multiselect and such.
- A cell editor, either in a modal or a side bar (side bar will probably be easier for the first pass);
    - The cell editor will be a form where you can toggle between wall and floor editors. 
    - In the future cells might have individual lighting.
- Wall editor will let you specify faces (including default texture) and trigger based interactions with each face.
- Floor editor let's you select texture and optionally select ceiling texture.  (We could allow floor tiles to trigger events too someday, but not now).
- A sprite editor. This is more involved in terms of the grid. We'd need an editor where we specify a sprite texture (for now it is going to be single faced static sprites), the bounding box, and a trigger (selected from a drop down list). But the sprite will also need to be able to be placed and moved in the map, which is tricky - the first pass can just allow for manually specifying the coordinates. 
- Toggles for showing/hiding walls, sprites, textures, etc.
- A preview pane. This will be the actual game running live (with controls only functioning when the window is in focus of course.) Having it run inside the react app (as a third party library of course) will make sharing state a lot easier. The game will need to have an editor mode set (to let it know it needs to be hot swappable.) First pass will just be reseting every time a change is made, but hopefully most pieces of state will be hot swappable.



Plan:
- Create a sky editor.
- MVP One color
- Allow for gradients with unlimited numbers of stops defined.
- We'll start with 2 floor, 4 wall, and 3 sky texture options.
- Allow for sky to be gradient or texture

Notes:
- We need to better dynamically tie the editors into the schema of the level since we are updating the level state directly.
- We need to have a single source of truth for the schema and it's variations (color, image etc.) we can use this for restoring defaults and such.
- Make it clear on the map what is a wall. Use an X (eventually to represent each face).
- Create a generic reusable texture selector and sprite texture selector (we'll need to sort out how to distinguish them (the engine loader will likely need to change a bit or it will just be manual coordination))
- Add in a cache of the previous tab for the floor editor so you don't lose state when tabbing back and forth (medium priority).
- Remove support for color formats. Use only hex. When it has to be different we'll convert on the fly. Much nicer to just be able to make assumptions.
- Could make it impossible to switch outerwalls to floors. That would save some time debugging the overflow crashes from the engine.
- Make a custom dropdown to use for textures that has a preview panel for each texture.
- Or make a texture picker modal.
- Add a compass overlay for the game and the grid and add in the player position and direction, so it's clear what is being faced.
- Can use a canvas overlay (with no pointer events) on the grid to still use native elements but have the player move freely. (Otherwise we'll need to consider switching the whole thing to canvas).
- Need to store references to image file paths for using as background urls of svgs.
- Color pickers might need the ability to manually specify the hex.
- Also, possible caching of previous selection so you can quickly copy settings.
- Or, actualy cell copy paste!!
- Also, time to start thinking about multi-select!

BUGS:
- Multiple clicks often required to switch texture type on option boxes