export interface NavHotspot {
  id: string;
  targetSceneId: string;
  label: string;
  position: [number, number, number];
}

export interface TourScene {
  id: string;
  label: string;
  panoramaUrl: string;
  navHotspots: NavHotspot[];
}

const tourScenes: TourScene[] = [
  {
    id: "lobby",
    label: "Grand Lobby",
    panoramaUrl: "/newman_lobby_4k.hdr",
    navHotspots: [
      { id: "lobby-to-lounge", targetSceneId: "lounge", label: "Private Lounge", position: [-9, -3, 0] },
      { id: "lobby-to-glasshouse", targetSceneId: "glasshouse", label: "Glasshouse Suite", position: [9, -3, 0] },
    ],
  },
  {
    id: "lounge",
    label: "Private Lounge",
    panoramaUrl: "/lythwood_lounge_4k.hdr",
    navHotspots: [
      { id: "lounge-to-lobby", targetSceneId: "lobby", label: "Grand Lobby", position: [9, -3, 0] },
      { id: "lounge-to-studio", targetSceneId: "studio", label: "The Studio", position: [0, -3, -9] },
    ],
  },
  {
    id: "glasshouse",
    label: "Glasshouse Suite",
    panoramaUrl: "/glasshouse_interior_4k.hdr",
    navHotspots: [
      { id: "glass-to-lobby", targetSceneId: "lobby", label: "Grand Lobby", position: [-9, -3, 0] },
      { id: "glass-to-studio", targetSceneId: "studio", label: "The Studio", position: [0, -3, -9] },
    ],
  },
  {
    id: "studio",
    label: "The Studio",
    panoramaUrl: "/brown_photostudio_02_4k.hdr",
    navHotspots: [
      { id: "studio-to-glasshouse", targetSceneId: "glasshouse", label: "Glasshouse Suite", position: [0, -3, 9] },
      { id: "studio-to-lounge", targetSceneId: "lounge", label: "Private Lounge", position: [9, -3, 0] },
    ],
  },
];

export default tourScenes;
