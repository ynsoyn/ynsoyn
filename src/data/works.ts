export const CATEGORIES = [
  { id: "xr",          label: "XR / VR",     description: "가상현실 / 혼합현실 / 공간 경험" },
  { id: "animation",   label: "CG & Film",   description: "3D CG · VFX · 단편영화" },
  { id: "interactive", label: "Interactive", description: "인터랙티브 콘텐츠 / 설치 / 툴" },
  { id: "research",    label: "Research",    description: "논문 / 실험 / 프로토타입" },
  { id: "design",      label: "Design",      description: "그래픽 / UI / 브랜딩" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

// ── 신규: 상위 도메인 3개 ──────────────────────────────────
export const DOMAINS = [
  { id: "experience-design", label: "Experience Design", description: "XR · 인터랙티브 · 경험 설계" },
  { id: "research",          label: "Research",          description: "논문 · 실험 · 프로토타입" },
  { id: "production",        label: "Production",        description: "CG · VFX · 영상 제작" },
] as const;

export type DomainId = (typeof DOMAINS)[number]["id"];

// ── 신규: 프로세스 단계 ────────────────────────────────────
export type ProcessType = "concept" | "design" | "dev" | "research" | "paper" | "content";

export const PROCESS_LABELS: Record<ProcessType, string> = {
  concept:  "콘셉트 디자인",
  design:   "디자인",
  dev:      "개발",
  research: "연구",
  paper:    "논문",
  content:  "콘텐츠 결과물",
};

export interface ProcessStep {
  type: ProcessType;
  description?: string;
  artifacts?: string[];       // 결과물 목록 (텍스트)
  connects?: ProcessType[];   // 우주맵 연결선용
}

export interface Work {
  id: string;
  title: string;
  year: number;
  categories: CategoryId[];
  domain?: DomainId;          // 신규 (선택적 — 점진 적용)
  processSteps?: ProcessStep[]; // 신규 (선택적)
  bgColor: string;
  description?: string;
  details?: string;
  tags?: string[];
  url?: string;
}

export const WORKS: Work[] = [

  // ── CG & Film — 2026 개인 창작 ───────────────────────────
  {
    id: "suicide-girl-zombie",
    title: "자살소녀와 좀비모기",
    year: 2026,
    categories: ["animation"],
    bgColor: "#d4c4c4",
    description: "자살시도 중 좀비 모기에 물리게되어 자살시도 실패한 소녀가 죽기 위해 고군분투하는 이야기.",
    details: "창작 스토리 · 창작 콘티 · 창작 스토리보드 · 창작 연출 · AI작업. 영화제 출품 예정.",
    tags: ["Short Film", "Storyboard", "AI", "Personal", "영화제"],
  },
  {
    id: "pavlov-girl",
    title: "파블로프의 소녀",
    year: 2026,
    categories: ["animation"],
    bgColor: "#ccc4cc",
    description: "항상 헤드셋을 끼고 다니는 소녀, 그 이유는 어떤 소리를 듣게되면 파블로프의 개처럼 반응하기 때문이다. 도대체 그 소리는 뭐길래?",
    details: "창작 스토리 · 창작 콘티 · 창작 스토리보드 · 창작 연출 · AI작업. 영화제 출품 예정.",
    tags: ["Short Film", "Storyboard", "AI", "Personal", "영화제"],
  },
  {
    id: "ondal-worldview",
    title: "바보 온달 세계관 영상",
    year: 2026,
    categories: ["animation", "xr"],
    domain: "production",
    processSteps: [
      {
        type: "concept",
        description: "바보온달·평강공주 원전 각색 · 세계관 설정 · 창작 콘티",
        artifacts: ["각색 스토리", "세계관 설정집", "콘티"],
        connects: ["design", "content"],
      },
      {
        type: "design",
        description: "창작 스토리보드 · 연출 설계",
        artifacts: ["스토리보드"],
        connects: ["concept", "content"],
      },
      {
        type: "content",
        description: "AI + 3D 영상 제작 · 최종 오프닝 영상",
        artifacts: ["오프닝 영상 (VR 삽입용)"],
        connects: ["design"],
      },
    ],
    bgColor: "#c4c8d4",
    description: "바보온달이 평강공주와 만나고 마법의 검을 갖게되어 전투에 나가는 이야기. VR 엑서게임에 삽입된 세계관 오프닝 영상.",
    details: "기존 바보온달·평강공주 이야기 각색 + 창작 콘티 · 창작 스토리보드 · 창작 연출 · AI작업.",
    tags: ["Animation", "AI", "World-building", "VR", "Short Film"],
  },

  // ── CG & Film — VFX 상업 (위지윅 스튜디오 2021–2023) ────
  {
    id: "hwanhon",
    title: "환혼 Part 1 / Part 2",
    year: 2022,
    categories: ["animation"],
    bgColor: "#d0ccc8",
    description: "tvN 판타지 드라마 《환혼》 Part 1 · Part 2 VFX 작업 참여. 위지윅 스튜디오. 프랍·캐릭터 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "TV Drama", "tvN"],
  },
  {
    id: "hansan",
    title: "한산: 용의 출현",
    year: 2022,
    categories: ["animation"],
    bgColor: "#c8ccc8",
    description: "영화 《한산: 용의 출현》 VFX 작업 참여. 위지윅 스튜디오. 프랍·캐릭터 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "Film"],
  },
  {
    id: "island",
    title: "아일랜드",
    year: 2022,
    categories: ["animation"],
    bgColor: "#c8ccd4",
    description: "TVING 드라마 《아일랜드》 VFX 작업 참여. 위지윅 스튜디오. 프랍·캐릭터·크리쳐 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "TV Drama", "TVING"],
  },
  {
    id: "sweet-home-2",
    title: "스위트홈 시즌2",
    year: 2023,
    categories: ["animation"],
    bgColor: "#ccc8c8",
    description: "Netflix 드라마 《스위트홈 시즌2》 VFX 작업 참여. 위지윅 스튜디오. 프랍·캐릭터·크리쳐 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "TV Drama", "Netflix"],
  },
  {
    id: "killers-shopping",
    title: "킬러들의 쇼핑몰",
    year: 2023,
    categories: ["animation"],
    bgColor: "#d4ccc8",
    description: "Disney+ 드라마 《킬러들의 쇼핑몰》 VFX 작업 참여. 위지윅 스튜디오. 프랍 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "TV Drama", "Disney+"],
  },
  {
    id: "juvenile-justice",
    title: "소년심판",
    year: 2022,
    categories: ["animation"],
    bgColor: "#c8d0cc",
    description: "Netflix 드라마 《소년심판》 VFX 작업 참여. 위지윅 스튜디오. 프랍 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "TV Drama", "Netflix"],
  },
  {
    id: "model-family",
    title: "모범가족",
    year: 2023,
    categories: ["animation"],
    bgColor: "#ccc8d0",
    description: "Netflix 드라마 《모범가족》 VFX 작업 참여. 위지윅 스튜디오. 프랍 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya", "TV Drama", "Netflix"],
  },
  {
    id: "new-normal",
    title: "뉴 노멀",
    year: 2023,
    categories: ["animation"],
    bgColor: "#d0ccc4",
    description: "《뉴 노멀》 VFX 작업 참여. 위지윅 스튜디오. 프랍 애니메이션.",
    tags: ["VFX", "3D Animation", "Maya"],
  },

  // ── CG & Film — 2021 개인 포트폴리오 ─────────────────────
  {
    id: "anim-portfolio-likes",
    title: "좋아요를 받고싶어",
    year: 2021,
    categories: ["animation"],
    bgColor: "#d4ccca",
    description: "좋아요를 받고싶은 인스타그램 게시글 속 캐릭터들의 이야기. 3D 캐릭터 애니메이션 포트폴리오 작품.",
    tags: ["3D", "Character Animation", "Maya", "Personal"],
  },
  {
    id: "anim-portfolio-sausage",
    title: "소세지를 훔치자",
    year: 2021,
    categories: ["animation"],
    bgColor: "#ccccca",
    description: "소인이 소세지를 훔치는 이야기. 3D 캐릭터 애니메이션 포트폴리오 작품.",
    tags: ["3D", "Character Animation", "Maya", "Personal"],
  },

  // ── XR + Research — 논문 / 연구 ──────────────────────────
  {
    id: "cave-popup",
    title: "CAVE 시스템 기반 인터랙티브 팝업스토어 콘텐츠 기획에 관한 연구",
    year: 2025,
    categories: ["xr", "research", "interactive"],
    domain: "research",
    processSteps: [
      {
        type: "concept",
        description: "기존 팝업스토어의 한계 분석 → CAVE 기반 지속가능 대안 기획",
        artifacts: ["기획안", "콘셉트 문서"],
        connects: ["research", "design"],
      },
      {
        type: "research",
        description: "문헌 연구 · 사례 분석 · 설문조사",
        artifacts: ["선행연구 분석", "사용자 설문 결과"],
        connects: ["concept", "dev", "paper"],
      },
      {
        type: "design",
        description: "4면 프로젝션 인터랙션 디자인 · 캐릭터 설계",
        artifacts: ["인터랙션 설계서", "캐릭터 디자인"],
        connects: ["concept", "dev"],
      },
      {
        type: "dev",
        description: "3D 콘텐츠 제작 · 추천 알고리즘 · 프로토타입 개발",
        artifacts: ["3D 애니메이션", "프로토타입 빌드"],
        connects: ["design", "research", "content"],
      },
      {
        type: "content",
        description: "전통주 체험 CAVE 콘텐츠 최종 결과물",
        artifacts: ["CAVE 인터랙티브 콘텐츠"],
        connects: ["dev"],
      },
      {
        type: "paper",
        description: "공동저자 · KCI 디지털 콘텐츠 학회 게재",
        artifacts: ["KCI 논문"],
        connects: ["research"],
      },
    ],
    bgColor: "#d8cccc",
    description: "자원 낭비를 유발하는 기존 팝업스토어의 한계에 대한 지속 가능한 대안으로 CAVE 기반 인터랙티브 팝업스토어 콘텐츠를 제안한다.",
    details: "문헌 연구, 사례 분석, 설문조사를 통해 CAVE의 효과성 및 바닥면 활용의 부족, 상호작용 다양성의 한계, 구매 연계 미흡 등의 문제를 확인하였다. 이를 해결하기 위해, 본 연구는 지역 전통주를 중심 콘텐츠로 4면 프로젝션 기반 캐릭터 활용 상호작용과 개인 맞춤형 전통주 추천 알고리즘, 지역 관광 정보 제공을 통합한 프로토타입을 개발하였다. 개발된 콘텐츠는 다인 체험에서도 개별화된 경험을 가능하게 했으며, 전통주 체험이 관광·지역 활성화로 확장될 가능성을 제시하였다. 종합적으로, 본 연구는 CAVE 기반 팝업스토어의 확장성과 지속 가능성을 실증적으로 확인하였으며, 향후 XR 기반 마케팅 전략 전반에 활용할 수 있는 구체적인 방향성을 제안한다.\n\n역할: 기획, 인터랙션 디자인, 3D 콘텐츠 제작 및 애니메이션. 공동저자. KCI 디지털 콘텐츠 학회.",
    tags: ["CAVE", "XR", "Research", "KCI", "Interactive", "Popup Store"],
  },
  {
    id: "vr-cooking",
    title: "VR 요리",
    year: 2025,
    categories: ["xr", "research"],
    bgColor: "#cdd4d8",
    description: "가상현실 환경에서의 요리 경험 콘텐츠 개발 및 연구. 공동저자. KCI 게임학회.",
    tags: ["VR", "Research", "KCI", "게임학회", "UX"],
  },
  {
    id: "vr-josso",
    title: "VR 조소",
    year: 2026,
    categories: ["xr", "research"],
    bgColor: "#d0cdd8",
    description: "VR 환경에서의 조소 창작 경험을 구현한 연구. 주저자. KCI 게재 예정.",
    tags: ["VR", "Sculpture", "Research", "KCI", "예정"],
  },
  {
    id: "vr-sojo",
    title: "VR 소조",
    year: 2026,
    categories: ["xr", "research"],
    bgColor: "#ccd4d8",
    description: "VR 공간에서 소조 조각 창작 경험을 구현한 연구. 인터랙션 설계, 햅틱 기반 조형 경험. 주저자. KCI 게재 예정.",
    tags: ["VR", "Sculpture", "Haptics", "Research", "KCI", "예정"],
  },
  {
    id: "vr-sojo-emg",
    title: "VR 소조 + 근전도 힘 피드백",
    year: 2026,
    categories: ["xr", "research"],
    bgColor: "#c8d0d8",
    description: "근전도 기반 힘 피드백을 활용한 햅틱 소조 경험 연구. 주저자. SCIE 저널 게재 예정.",
    tags: ["VR", "EMG", "Haptics", "SCIE", "Research", "예정"],
  },
  {
    id: "vr-art-dissertation",
    title: "가상현실(VR) 환경 기반 예술 활동 및 다중감각 인터랙션에 관한 사용자 경험(UX) 연구",
    year: 2026,
    categories: ["xr", "research"],
    bgColor: "#d4d0d8",
    description: "VR 환경 기반 예술 활동과 다중감각 인터랙션에 관한 사용자 경험 연구. 주저자. 학위논문 예정.",
    tags: ["VR", "Multisensory", "UX", "Dissertation", "Research", "예정"],
  },
  {
    id: "roblox-window",
    title: "로블록스 창문형 디스플레이 탐구",
    year: 2026,
    categories: ["xr", "research"],
    bgColor: "#d4d8cc",
    description: "로블록스 플랫폼 내 창문형 디스플레이가 사용자 경험에 미치는 영향 탐구. 공동저자. KCI 게재 예정.",
    tags: ["Roblox", "Metaverse", "Research", "KCI", "예정"],
  },

  // ── Research (단독) ───────────────────────────────────────
  {
    id: "color-vibration",
    title: "색상-진동 공감각 매핑 기초 연구",
    year: 2026,
    categories: ["research"],
    bgColor: "#d8d4cd",
    description: "색상 자극과 진동 피드백의 교차감각 매핑에 관한 기초 연구. 시각-촉각 매핑 기반 인터랙션. 주저자. SCIE 게재 예정.",
    tags: ["Synesthesia", "Haptics", "Color", "SCIE", "Research", "예정"],
  },
  {
    id: "game-dda",
    title: "A Pre-emptive Difficulty Control Framework for Open World Games",
    year: 2026,
    categories: ["research"],
    bgColor: "#cdd0d8",
    description: "오픈월드 게임의 '콜드 스타트' 문제를 해결하는 선제적 난이도 조절 프레임워크 연구. 공동저자. SCIE Entertainment Computing 심사중.",
    tags: ["Game", "DDA", "SCIE", "Research", "Open World", "Entertainment Computing"],
  },
  {
    id: "xr-exhibition-flow",
    title: "XR 전시 환경에서의 동선 메타 연구",
    year: 2026,
    categories: ["xr", "research"],
    bgColor: "#d0d4d8",
    description: "XR 전시 환경에서의 사용자 동선에 관한 메타 연구. 공동저자. KCI 게재 예정.",
    tags: ["XR", "Exhibition", "Research", "KCI", "Meta-analysis", "예정"],
  },

  // ── XR + Interactive ──────────────────────────────────────
  {
    id: "vr-exergame",
    title: "VR 엑서게임",
    year: 2026,
    categories: ["xr", "interactive"],
    domain: "experience-design",
    processSteps: [
      {
        type: "concept",
        description: "바보온달 세계관 기반 VR 엑서게임 기획 · 팀 리드",
        artifacts: ["기획서", "세계관 문서", "스토리보드"],
        connects: ["design", "dev"],
      },
      {
        type: "design",
        description: "레벨 디자인 · UI/UX · 오프닝 영상 콘티",
        artifacts: ["레벨 디자인 문서", "UI 설계"],
        connects: ["concept", "dev", "content"],
      },
      {
        type: "dev",
        description: "Unity VR 개발 · 인터랙션 로직 · 빌드",
        artifacts: ["Unity 프로젝트", "VR 빌드"],
        connects: ["design", "content"],
      },
      {
        type: "content",
        description: "바보온달 세계관 오프닝 영상 (AI + 3D)",
        artifacts: ["오프닝 영상"],
        connects: ["design", "dev"],
      },
    ],
    bgColor: "#d8ccd4",
    description: "기획·설계·디자인·개발까지 전담한 VR 엑서게임. 가상융합서비스 개발자경진대회 출품작 (팀장).",
    details: "바보온달 세계관 오프닝 영상 포함. Unity 기반 VR 콘텐츠 개발. 성인-자유 부문 출전.",
    tags: ["VR", "Exergame", "Unity", "Development", "Competition"],
  },

  // ── Interactive ────────────────────────────────────────────
  {
    id: "canoe-seed-game",
    title: "씨드 콜렉터",
    year: 2024,
    categories: ["interactive"],
    bgColor: "#c4d0c8",
    description: "카누를 타고 강을 따라 이동하며 하늘에서 떨어지는 외계 씨드를 놓치지 않고 수집하는 복셀 스타일 아케이드 게임.",
    details: "외계 씨드는 끊임없이 떨어지며, 플레이어는 카누를 조종해 씨드를 놓치지 않고 회수해야 합니다. 씨드를 놓치면 강물에 흘러가거나 사라져 버리므로 신속한 판단과 정확한 이동이 중요합니다.\n\n고전 게임 남극탐험(1985)에서 영감을 받아, 단순하고 직관적인 조작과 아케이드 스타일의 긴장감을 현대적인 복셀 그래픽으로 재해석했습니다.\n\n주요 특징\n· 복셀 스타일의 아기자기한 비주얼\n· 간단한 조작으로 즐길 수 있는 아케이드 게임플레이\n· 카누를 조종하며 떨어지는 외계 씨드 수집\n· 씨드를 놓치지 않기 위한 빠른 반응과 위치 선정\n· 고전 아케이드 게임에서 영감을 받은 직관적인 게임 구조",
    tags: ["Game", "Voxel", "Arcade", "PC", "Keyboard", "Personal"],
  },
  {
    id: "chrome-extension",
    title: "Chrome 익스텐션",
    year: 2025,
    categories: ["interactive"],
    bgColor: "#ccd8d4",
    description: "개인 필요에서 출발한 구글 크롬 브라우저 익스텐션 개발.",
    tags: ["Chrome Extension", "Dev", "Personal"],
  },

  // ── Design ────────────────────────────────────────────────
  {
    id: "graphic-design",
    title: "그래픽 디자인",
    year: 2024,
    categories: ["design"],
    bgColor: "#d8d8cc",
    description: "브로셔, 배너, Figma UI 등 다양한 의뢰 그래픽 디자인 작업 모음.",
    tags: ["Figma", "Brochure", "Banner", "Design"],
  },
];
