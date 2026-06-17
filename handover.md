# ynsoyn.com 포트폴리오 작업일지

## 프로젝트 개요
포트폴리오 웹사이트 — ynsoyn.com
Next.js 14 App Router + Three.js + Tailwind CSS

---

## 완료된 작업

### 세션 1 — 프로젝트 세팅 + 레이아웃 + Home 페이지

#### 세팅
- `create-next-app` (TypeScript, Tailwind, App Router, src-dir)
- 추가 패키지: `three`, `@react-three/fiber`, `@react-three/drei`, `framer-motion`, `gsap`

#### 파일 구조
```
src/
├── app/
│   ├── layout.tsx          — 공통 레이아웃 (Navbar 포함)
│   ├── page.tsx            — Home (/)
│   ├── about/page.tsx      — About Me (/about)
│   ├── works/page.tsx      — Works (/works)
│   └── contact/page.tsx    — Contact (/contact)
├── components/
│   ├── nav/Navbar.tsx      — 공통 Navbar
│   └── home/
│       ├── MobileScene.tsx     — Calder 스타일 3D 모빌 (R3F)
│       ├── CategoryPanel.tsx   — 우측 카테고리 패널 (Framer Motion)
│       └── WorksCarousel.tsx   — 하단 가로 스크롤 작업물 카드
└── data/
    └── works.ts            — 카테고리 & 작업물 데이터
```

#### Home 페이지 인터랙션
- 마우스 휠 (모빌 영역) → 3D 모빌 Y축 회전 + 카테고리 전환 (π/2 간격)
- 마우스 휠 (카드 영역) → 가로 스크롤

#### 카테고리 (현재 플레이스홀더)
| id | label | description |
|----|-------|-------------|
| all | All | 전체 작업물 |
| 3d | 3D | 3D 모델링 & 렌더링 |
| motion | Motion | 모션 그래픽 & 애니메이션 |
| visual | Visual | 비주얼 디자인 |

---

## 다음 작업 예정

### Home 페이지
- [ ] 실제 작업물 데이터 입력 (`src/data/works.ts`)
- [ ] 카테고리 이름/설명 확정
- [ ] 작업물 썸네일 이미지 연결 (현재 bgColor 플레이스홀더)
- [ ] 카드 클릭 → 작업물 상세 페이지

### About Me 페이지 (`/about`)
- [ ] 와이어프레임 3D 캐릭터 구현 (Three.js)
- [ ] 이름/소개 텍스트 입력
- [ ] SNS 링크 (Facebook, LinkedIn, YouTube, Instagram)

### Works 페이지 (`/works`)
- [ ] 카테고리 필터 탭
- [ ] 3열 그리드 갤러리
- [ ] 필터링 애니메이션

### Contact 페이지 (`/contact`)
- [ ] 이름/성/이메일/메시지 폼
- [ ] 폼 제출 처리 (이메일 또는 외부 서비스 연결)

---

## 실행 방법
```bash
npm run dev   # http://localhost:3000
```

---

## 참고
- 디자인 레퍼런스: `Ref/` 폴더 (home.png, aboutme.png, works.png, contact.png)
- 3D 모빌: Calder 스타일 키네틱 조각 영감
