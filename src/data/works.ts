export const CATEGORIES = [
  { id: "perception",   label: "Perception",               description: "인간의 감각 / 지각 / 멀미 / 촉각 / 색채" },
  { id: "immersive",    label: "Immersive Worlds",          description: "VR / XR / 공간 / 시뮬레이션" },
  { id: "interaction",  label: "Interaction & Systems",     description: "UX / 서비스 / 앱 / 인터랙션 설계" },
  { id: "cultural",     label: "Cultural / Spatial Design", description: "팝업 스토어 / 콘텐츠 기획 / 경험 디자인" },
  { id: "creative",     label: "Creative Media",            description: "VFX / 3D / 애니메이션" },
  { id: "experimental", label: "Experimental Tools",        description: "개인 프로젝트 / 프로토타입 / 개발 실험" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export interface Work {
  id: string;
  title: string;
  year: number;
  category: CategoryId;
  bgColor: string;
  description?: string;
  tags?: string[];
}

export const WORKS: Work[] = [
  { id: "1", title: "Project 01", year: 2024, category: "perception",   bgColor: "#d9d3cb", description: "인간의 지각과 감각 경험을 탐구하는 프로젝트.", tags: ["UX", "Research"] },
  { id: "2", title: "Project 02", year: 2024, category: "immersive",    bgColor: "#cbd3d9", description: "VR 환경에서의 공간 경험 디자인.", tags: ["VR", "XR"] },
  { id: "3", title: "Project 03", year: 2024, category: "interaction",  bgColor: "#d9cbd3", description: "사용자 흐름을 중심으로 한 인터랙션 시스템.", tags: ["UX", "App"] },
  { id: "4", title: "Project 04", year: 2023, category: "cultural",     bgColor: "#cdd9cb", description: "공간 경험과 콘텐츠 기획을 결합한 팝업 디자인.", tags: ["Spatial", "Event"] },
  { id: "5", title: "Project 05", year: 2023, category: "creative",     bgColor: "#d3cbd9", description: "3D 애니메이션과 VFX를 활용한 크리에이티브 작업.", tags: ["3D", "VFX"] },
  { id: "6", title: "Project 06", year: 2023, category: "experimental", bgColor: "#d9d9cb", description: "개인 프로토타입 실험 — 인터랙티브 도구 제작.", tags: ["Dev", "Prototype"] },
  { id: "7", title: "Project 07", year: 2022, category: "perception",   bgColor: "#ddd3d9", description: "색채와 형태를 통한 지각 실험.", tags: ["Color", "Perception"] },
  { id: "8", title: "Project 08", year: 2022, category: "creative",     bgColor: "#d3ddd9", description: "Maya 기반 캐릭터 애니메이션 프로젝트.", tags: ["Maya", "Animation"] },
  { id: "9", title: "Project 09", year: 2022, category: "immersive",    bgColor: "#d9ddd3", description: "몰입형 시뮬레이션 환경 구현.", tags: ["Simulation", "XR"] },
];
