export const CATEGORIES = [
  { id: "all",    label: "All",    description: "전체 작업물" },
  { id: "3d",     label: "3D",     description: "3D 모델링 & 렌더링" },
  { id: "motion", label: "Motion", description: "모션 그래픽 & 애니메이션" },
  { id: "visual", label: "Visual", description: "비주얼 디자인" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export interface Work {
  id: string;
  title: string;
  year: number;
  category: CategoryId;
  bgColor: string;
}

export const WORKS: Work[] = [
  { id: "1", title: "Project 01", year: 2024, category: "3d",     bgColor: "#d9d3cb" },
  { id: "2", title: "Project 02", year: 2024, category: "motion", bgColor: "#cbd3d9" },
  { id: "3", title: "Project 03", year: 2024, category: "visual", bgColor: "#d9cbd3" },
  { id: "4", title: "Project 04", year: 2023, category: "3d",     bgColor: "#cdd9cb" },
  { id: "5", title: "Project 05", year: 2023, category: "visual", bgColor: "#d3cbd9" },
  { id: "6", title: "Project 06", year: 2023, category: "motion", bgColor: "#d9d9cb" },
];
