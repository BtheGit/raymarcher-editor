const textureNames = [
  'concrete_brick1.jpg',
  'concrete_brick2.jpg',
  'concrete_tile1.jpg',
  'concrete_tile2.jpg',
  'concrete_tile3.jpg',
  'concrete1.jpg',
  'concrete2.jpg',
  'floor_carpet1.jpg',
  'floor_grass1.jpg',
  'floor1.jpg',
  'fresco1.jpg',
  'hedge1.jpg',
  'hedge2.jpg',
  'light_brick1.jpg',
  'marble1.jpg',
  'plaster1.jpg',
  'red_brick1.jpg',
  'rusted_steel1.jpg',
  'stone2.jpg',
  'stripes_creamsicle1.jpg',
  'background__trees1.jpg',
  'background__clouds1.jpg',
  'background__space1.jpg',
  'sprite__tree_1.png',
]

const PATH = process.env.PUBLIC_URL + '/textures/';

const WALL = { type: 'wall', textureType: 'image', textureConfig: { name: 'red_brick1' }, faces: { north: null, east: null, south: null, west: null } };
const EXT_WALL = { type: 'wall', textureType: 'image', textureConfig: { name: 'hedge1' }, faces: { north: null, east: null, south: null, west: null } };
const FLOOR = { type: 'floor', textureType: 'image', textureConfig: { name: 'floor_grass1' }, };
const INT_FLOOR = { type: 'floor', textureType: 'image', textureConfig: { name: 'concrete_brick2' }, ceilingConfig: { textureType: 'image', textureConfig: { name: 'fresco1'}}};
const EXT_FLOOR = { type: 'floor', textureType: 'image', textureConfig: { name: 'concrete_brick2' }, };

export default {
  textures: textureNames.map(name => PATH + name),
  sprites: [
    {
      // TODO: We need to ensure unique names. To that end we might want to move from an array to a map.
      name: 'tree1',
      spritesheet: 'sprite__tree_1',
      pos: {
        x: 8.5,
        y: 17,
      },
      isAnimated: false,
      isMultifaceted: false,
      isSolid: true,
      boundingBox: .2,
    },
    {
      name: 'tree2',
      spritesheet: 'sprite__tree_1',
      pos: {
        x: 8.75,
        y: 16.5,
      },
      isAnimated: false,
      isMultifaceted: false,
      isSolid: true,
      boundingBox: .2,
      verticalOffset: 1,
    },
    {
      name: 'tree3',
      spritesheet: 'sprite__tree_1',
      pos: {
        x: 10.5,
        y: 17,
      },
      isAnimated: false,
      isMultifaceted: false,
      isSolid: true,
      boundingBox: .2,
    },
    {
      name: 'tree4',
      spritesheet: 'sprite__tree_1',
      pos: {
        x: 10.25,
        y: 16.5,
      },
      isAnimated: false,
      isMultifaceted: false,
      isSolid: true,
      boundingBox: .2,
      verticalOffset: 1,
    },
  ],
  tiles: [],
  map: {
    grid: [
      [EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,WALL,WALL,INT_FLOOR,WALL,WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,WALL,INT_FLOOR,INT_FLOOR,INT_FLOOR,WALL,WALL,WALL,WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,WALL,INT_FLOOR,INT_FLOOR,INT_FLOOR,INT_FLOOR,INT_FLOOR,INT_FLOOR,INT_FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,WALL,INT_FLOOR,INT_FLOOR,INT_FLOOR,WALL,WALL,WALL,WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,WALL,WALL,INT_FLOOR,WALL,WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,FLOOR,EXT_WALL],
      [EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL,EXT_WALL],    
    ],
    player: {
      pos: {
        x: 9.5,
        y: 20
      },
      dir: {
        x: 0,
        y: -1
      },
      plane: {
        x: -0.66,
        Y: 0
      },
    },
    sky: {
      textureType: 'image',
      textureConfig: {
        name: 'background__clouds1'
      }    
    },
  },
}