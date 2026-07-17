export interface TourHotspot {
  id: string;
  label: string;
  description: string;
  position: [number, number, number];
  metadata: { key: string; value: string }[];
}

const tourHotspots: TourHotspot[] = [
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
      "A chef-grade kitchen island crafted from Italian marble, featuring integrated induction cooktops and a cascading waterfall edge. Designed for both intimate dinners and grand entertaining.",
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
      "The signature structural glass roof allows unobstructed views of the sky, flooding the interior with dynamic natural light throughout the day. UV-filtering laminated glass ensures comfort year-round.",
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
      "Seamless indoor-outdoor connectivity through retractable glass walls. The landscaped garden features native plantings, a reflective pool, and sculptural lighting elements.",
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
      "A quiet alcove designed for contemplation, lined with custom walnut shelving and a built-in daybed upholstered in Belgian linen. Ambient lighting adjusts to time of day.",
    position: [-5, 0, -8],
    metadata: [
      { key: "Shelving", value: "American Walnut" },
      { key: "Upholstery", value: "Belgian Linen" },
      { key: "Lighting", value: "Circadian Adaptive" },
    ],
  },
];

export default tourHotspots;
