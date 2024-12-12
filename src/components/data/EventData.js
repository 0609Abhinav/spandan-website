// Dynamic image importer helper function
const importAll = (r) => r.keys().map(r);

// Import images dynamically for each event
const mehendiMagic = importAll(require.context('../../assets/Mehendi_Magic', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const bestOutOfWaste = importAll(require.context('../../assets/Best_Out_Of_Waste', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const clayModelling = importAll(require.context('../../assets/Clay_Modlling', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const sketching = importAll(require.context('../../assets/Sketching', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const collageMaking = importAll(require.context('../../assets/Collage_Making', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const designThroughPaper = importAll(require.context('../../assets/Design_Through_Paper', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const facePainting = importAll(require.context('../../assets/Face_Painting', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const wallPainting = importAll(require.context('../../assets/Wall_Painting', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const tattooMaking = importAll(require.context('../../assets/Tattoo_Making', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const painting = importAll(require.context('../../assets/Painting', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const rangoli = importAll(require.context('../../assets/Rangoli', false, /\.(jpg|jpeg|png|gif|JPG)$/));
const trashToTreasure = importAll(require.context('../../assets/Trash_to_Tresure', false, /\.(jpg|jpeg|png|gif|JPG)$/));

// Event data
export const eventsData = [
  {
    id: 1,
    title: "Graphite Symphony",
    description: "Sketching",
    images: sketching,
  },
  {
    id: 2,
    title: "Creative Cluster",
    description: "Collage Making",
    images: collageMaking,
  },
  {
    id: 3,
    title: "Mehendi Magic",
    description: "Mehendi",
    images: mehendiMagic,
  },
  {
    id: 4,
    title: "Crease and Create",
    description: "Design Through Paper",
    images: designThroughPaper,
  },
  {
    id: 5,
    title: "Whimsical Mask and Face Painting",
    description: "Face Painting and Mask Painting",
    images: facePainting,
  },
  {
    id: 6,
    title: "Moulded Magic",
    description: "Clay Modelling",
    images: clayModelling,
  },
  {
    id: 7,
    title: "Brushstrokes and Beyond",
    description: "Painting",
    images: painting,
  },
  {
    id: 8,
    title: "Trash to Treasure",
    description: "Best Out From Waste",
    images: trashToTreasure,
  },
  {
    id: 9,
    title: "Waste to Wow",
    description: "Best out of Waste",
    images: bestOutOfWaste,
  },
  {
    id: 10,
    title: "Concrete Canvas",
    description: "Wall Painting",
    images: wallPainting,
  },
  {
    id: 11,
    title: "Inkfluence",
    description: "Tattoo Making",
    images: tattooMaking,
  },
  {
    id: 12,
    title: "Colourful Creations",
    description: "Rangoli",
    images: rangoli,
  },
];
