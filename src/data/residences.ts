import type { NavHotspot } from "@/data/tourScenes";

export interface ResidenceHotspot {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  metadata: { key: string; value: string }[];
}

export interface Residence {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pricePerNight: number;
  size: string;
  guests: number;
  panoramaUrl: string;
  image: string;
  amenities: string[];
  specs: { key: string; value: string }[];
  hotspots: ResidenceHotspot[];
  navHotspots: NavHotspot[];
}

const residences: Residence[] = [
  {
    id: "pavilion",
    name: "Beach Pavilion",
    tagline: "Where the ocean meets design",
    description:
      "A private sanctuary perched above the shoreline, the Beach Pavilion wraps its occupants in natural light and curated quiet. Floor-to-ceiling glass panels dissolve the boundary between interior and sea, while handcrafted details remind you that every surface was made with intention.",
    pricePerNight: 850,
    size: "120 m²",
    guests: 2,
    panoramaUrl: "/glasshouse_interior_4k.webp",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=90",
    amenities: [
      "Private terrace",
      "Plunge pool",
      "Ocean view",
      "Butler service",
      "Spa access",
    ],
    specs: [
      { key: "Size", value: "120 m²" },
      { key: "Capacity", value: "2 guests" },
      { key: "Bed", value: "King" },
      { key: "View", value: "Ocean" },
    ],
    hotspots: [
      {
        id: "living-area",
        label: "Living Area",
        description:
          "An open-plan living space bathed in natural light from floor-to-ceiling glass panels. The double-height ceilings and curated furnishings create an atmosphere of refined comfort.",
        position: [-8, 1, 4],
        metadata: [
          { key: "Area", value: "85 m²" },
          { key: "Material", value: "Oak & Polished Concrete" },
          { key: "Ceiling Height", value: "5.2 m" },
        ],
      },
      {
        id: "kitchen-island",
        label: "Kitchen Island",
        description:
          "A chef-grade kitchen island crafted from Italian marble, featuring integrated induction cooktops and a cascading waterfall edge.",
        position: [6, 0, -7],
        metadata: [
          { key: "Surface", value: "Calacatta Marble" },
          { key: "Appliances", value: "Gaggenau Suite" },
          { key: "Seating", value: "4 Bar Stools" },
        ],
      },
      {
        id: "glass-ceiling",
        label: "Glass Ceiling",
        description:
          "The signature structural glass roof allows unobstructed views of the sky, flooding the interior with dynamic natural light throughout the day.",
        position: [0, 9, 0],
        metadata: [
          { key: "Glass Type", value: "UV-Laminated Triple Pane" },
          { key: "Structure", value: "Steel & Timber Hybrid" },
          { key: "Coverage", value: "120 m²" },
        ],
      },
      {
        id: "garden-view",
        label: "Garden View",
        description:
          "Seamless indoor-outdoor connectivity through retractable glass walls. The landscaped garden features native plantings, a reflective pool, and sculptural lighting.",
        position: [9, -1, 3],
        metadata: [
          { key: "Garden Area", value: "200 m²" },
          { key: "Landscape", value: "Native & Tropical" },
          { key: "Feature", value: "Reflective Pool" },
        ],
      },
      {
        id: "reading-nook",
        label: "Reading Nook",
        description:
          "A quiet alcove designed for contemplation, lined with custom walnut shelving and a built-in daybed upholstered in Belgian linen.",
        position: [-5, 0, -8],
        metadata: [
          { key: "Shelving", value: "American Walnut" },
          { key: "Upholstery", value: "Belgian Linen" },
          { key: "Lighting", value: "Circadian Adaptive" },
        ],
      },
    ],
    navHotspots: [
      { id: "pavilion-prev", targetSceneId: "atelier", label: "The Atelier", position: [-9, -3, 0] },
      { id: "pavilion-next", targetSceneId: "garden", label: "Garden Suite", position: [9, -3, 0] },
    ],
  },
  {
    id: "garden",
    name: "Garden Suite",
    tagline: "A retreat within the retreat",
    description:
      "Enveloped by a private garden of tropical plantings, the Garden Suite brings the outside in at every turn. The wraparound terrace and meditation pavilion invite a slower, more contemplative pace — a place to exhale fully.",
    pricePerNight: 1200,
    size: "180 m²",
    guests: 4,
    panoramaUrl: "/lythwood_lounge_4k.webp",
    image:
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600&q=90",
    amenities: [
      "Private garden",
      "Meditation pavilion",
      "Outdoor shower",
      "Butler service",
      "Spa access",
    ],
    specs: [
      { key: "Size", value: "180 m²" },
      { key: "Capacity", value: "4 guests" },
      { key: "Bed", value: "King + Twin" },
      { key: "View", value: "Garden" },
    ],
    hotspots: [],
    navHotspots: [
      { id: "garden-prev", targetSceneId: "pavilion", label: "Beach Pavilion", position: [-9, -3, 0] },
      { id: "garden-next", targetSceneId: "ocean", label: "Ocean House", position: [9, -3, 0] },
    ],
  },
  {
    id: "ocean",
    name: "Ocean House",
    tagline: "The horizon is yours alone",
    description:
      "The grandest of Haven's residences, Ocean House stretches across three levels with uninterrupted panoramic views. A private infinity pool, chef's kitchen, and dedicated event space make it a world unto itself.",
    pricePerNight: 2400,
    size: "320 m²",
    guests: 6,
    panoramaUrl: "/newman_lobby_4k.webp",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1600&q=90",
    amenities: [
      "Infinity pool",
      "Chef's kitchen",
      "Cinema room",
      "Private dock",
      "Concierge",
    ],
    specs: [
      { key: "Size", value: "320 m²" },
      { key: "Capacity", value: "6 guests" },
      { key: "Bed", value: "3 × King" },
      { key: "View", value: "Panoramic Ocean" },
    ],
    hotspots: [],
    navHotspots: [
      { id: "ocean-prev", targetSceneId: "garden", label: "Garden Suite", position: [-9, -3, 0] },
      { id: "ocean-next", targetSceneId: "atelier", label: "The Atelier", position: [9, -3, 0] },
    ],
  },
  {
    id: "atelier",
    name: "The Atelier",
    tagline: "Crafted for the creative mind",
    description:
      "Originally an artist's working studio, The Atelier has been transformed into Haven's most singular offering. Soaring ceilings, north-facing skylights, and a curated collection of original works create an environment that feeds the imagination.",
    pricePerNight: 650,
    size: "90 m²",
    guests: 2,
    panoramaUrl: "/brown_photostudio_02_4k.webp",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=90",
    amenities: [
      "North-facing skylights",
      "Artist materials",
      "Vinyl collection",
      "Espresso bar",
      "Courtyard",
    ],
    specs: [
      { key: "Size", value: "90 m²" },
      { key: "Capacity", value: "2 guests" },
      { key: "Bed", value: "Queen" },
      { key: "View", value: "Courtyard" },
    ],
    hotspots: [],
    navHotspots: [
      { id: "atelier-prev", targetSceneId: "ocean", label: "Ocean House", position: [-9, -3, 0] },
      { id: "atelier-next", targetSceneId: "pavilion", label: "Beach Pavilion", position: [9, -3, 0] },
    ],
  },
];

export default residences;
