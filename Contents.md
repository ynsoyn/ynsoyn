# ynsoyn.com — 채워야 할 콘텐츠 목록

작성 후 알려주시면 코드에 반영해드립니다.

---

## 1. 작업물 (works.ts)

각 작업물의 내용을 확인·수정해주세요.  
카테고리: **XR/VR** · **Animation & Film** · **Interactive** · **Research** · **Design**

| id | 제목 | 카테고리 | 수정 필요 항목 |
|----|------|---------|--------------|
| `vfx-commercial` | VFX CG 상업 작업 | animation | 설명 보완 / url |
| `anim-portfolio` | 3D 애니메이션 포트폴리오 | animation | 설명 보완 / url |
| `xr-motion-sickness` | XR 멀미 저감 시스템 | xr · research | 설명 보완 / url |
| `emg-vr-sculpture` | 근전도 VR 소조 인터랙션 | xr · research · interactive | 설명 보완 / url |
| `vr-sculpture-research` | VR 조소·조각 콘텐츠 | xr · research | 설명 보완 / url |
| `vr-cooking` | VR 요리 콘텐츠 | xr · research | 설명 보완 / url |
| `color-vibration` | 색채-진동 맵핑 | research | 설명 보완 / url |
| `vr-exergame` | VR 엑서게임 | xr · interactive | 설명 보완 / url |
| `cave-popup` | CAVE 팝업스토어 | xr · interactive | 설명 보완 / url |
| `vr-sculpture-contest` | VR 조소체험 프로그램 | xr · interactive | 설명 보완 / url |
| `roblox-window` | 로블록스 창문형 디스플레이 탐구 | xr · research | 설명 보완 / url |
| `chrome-extension` | Chrome 익스텐션 | interactive | 설명 보완 / url |
| `graphic-design` | 그래픽 디자인 | design | 설명 보완 / url |

### 항목 설명

- **제목** — 현재 임시 제목이 있습니다. 정식 명칭이 있으면 수정해주세요.
- **설명** (`description`) — 작업물 상세 화면에 표시됩니다. 1~3문장.
- **태그** (`tags`) — 기술/도구 키워드. 필터 기능에서 사용됩니다. 예: `["Maya", "3D", "VFX"]`
- **bgColor** — 썸네일 이미지가 없을 때 보이는 대표색. 현재 임의 지정. 원하는 색 있으면 말해주세요.
- **url** — 외부 포트폴리오 링크가 있으면 추가. 없으면 생략.

---

## 2. 작업물 썸네일 이미지

`public/works/` 폴더에 파일을 넣어주세요.  
파일명은 각 작업물의 `id`와 동일하게 해주세요.

```
public/
  works/
    vfx-commercial.jpg
    anim-portfolio.jpg
    xr-motion-sickness.jpg
    emg-vr-sculpture.jpg
    vr-sculpture-research.jpg
    vr-cooking.jpg
    color-vibration.jpg
    vr-exergame.jpg
    cave-popup.jpg
    vr-sculpture-contest.jpg
    roblox-window.jpg
    chrome-extension.jpg
    graphic-design.jpg
```

권장 사양: `1600×1200px` (4:3 비율) 또는 `1280×960px`  
형식: `.jpg` / `.png` / `.webp` 모두 가능

---

## 3. SNS 링크 (about/page.tsx)

현재 `#` (빈 링크) 상태입니다. 실제 URL을 알려주세요.

| 플랫폼 | 현재 | 입력 |
|--------|------|------|
| Instagram | `#` | |
| LinkedIn | `#` | |
| YouTube | `#` | |
| GitHub | `https://github.com/ynsoyn` | ✅ 완료 |

---

## 4. Contact 이메일 연동

현재 제출 버튼은 `alert()`만 실행합니다. 실제 이메일 전송을 원하면:

**옵션 A — EmailJS** (무료, 프론트엔드만으로 구현)
- emailjs.com 가입 → Service ID / Template ID / Public Key 발급
- 알려주시면 코드 연결해드립니다.

**옵션 B — Resend** (유료, 서버 필요)
- 현재 static export(`output: "export"`) 구조에선 서버리스 필요
- Vercel 배포로 전환 시 API Route로 구현 가능

---

## 5. About Me 텍스트

현재 하드코딩된 내용 확인해주세요.

**이름** — 현재 `윤소연` (한글만)  
영문 이름이 필요하면 추가 가능합니다. (`Soyeon Yoon` 등)

**직함** — 현재 `Designer · Developer`  
바꾸고 싶으면 말해주세요.

**학력** — 현재 입력된 내용:
```
2025—2027  경희대학교 일반대학원  실감AX융합학과 공학 석사
2014—2019  중앙대학교 예술대학교  미술학부 조소전공 미술 학사
2011—2014  계원예술고등학교      미술과
```

**경력** — 현재 입력된 내용:
```
2021—2023  위지윅 스튜디오  VFX Animator
  — 환혼 Part 1/2 (tvN)
  — 한산: 용의 출현
  — 아일랜드 (TVING)
  — 스위트홈 시즌2 (Netflix)
```

추가·수정 사항 있으면 알려주세요.

---

## 6. 우주 마인드맵 노드 설명 (SpaceGraphScene.tsx)

현재 모든 노드에 설명이 들어가 있습니다.  
클릭하면 오른쪽 노드 패널에 표시됩니다.

수정이 필요한 항목만 알려주시면 됩니다.  
→ `src/components/about/SpaceGraphScene.tsx` 내 `description` 필드

---

## 7. OG 이미지 (소셜 공유 미리보기)

현재 없습니다. SNS에 링크 공유 시 미리보기 이미지가 표시되지 않습니다.

`public/og-image.png` (1200×630px)을 만들어서 넣어주세요.  
만들면 코드에 연결해드립니다.

---

## 8. FONTS.md 폰트 지정

✅ **완료** — `globals.css`와 각 컴포넌트에 적용됨.

| 요소 | 적용 폰트 |
|------|---------|
| 사이트 로고 | JejuStoneWall |
| 네비게이션 링크 | SchoolSafetyRoundedSmile |
| 카테고리 활성 대제목 | KblJumpExtended + EunpyeongSagaDokseo + BookkMyungjo |
| 기본 본문 | Sweet (SUITE) |
| 예비 한글 서체 | MaruBuri (선언됨, 필요 시 적용 가능) |

---

## 9. 작업 추가 예정 목록

나중에 추가할 작업물이 있으면 여기에 메모해두세요.

```
예시:
- 포트폴리오 사이트 자체 (ynsoyn.com) → interactive 카테고리
- 졸업 논문 → research 카테고리
```

---

*최종 업데이트: 2026-06-24 (폰트 적용 완료 / 작업물 카테고리 정리)*
