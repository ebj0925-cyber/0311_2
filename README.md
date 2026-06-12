# 🛒 풀무원 쇼핑몰 퍼블리싱

<!-- 대표 이미지: 아래 URL을 실제 스크린샷 이미지로 교체하세요 -->
<!-- 방법: 이 README.md 편집 화면 → 이미지 드래그앤드롭 → 생성된 URL 복붙 -->
![풀무원 쇼핑몰 메인 화면](https://ebj0925-cyber.github.io/0311_2/img/banner/mid_banner.jpg)

식품 커머스 메인 + 서브 페이지 퍼블리싱  
AI 추천 섹션, 카테고리 UI, 브랜드별 상품 구성을 **반응형**으로 구현한 쇼핑몰 프로젝트

[![GitHub Pages](https://img.shields.io/badge/Live_Demo-풀무원_쇼핑몰-4CAF50?style=flat-square&logo=github)](https://ebj0925-cyber.github.io/0311_2/index.html)

---

## 📌 목차

[🚩 개요](#-개요) &nbsp;·&nbsp;
[🔧 기술 스택](#-기술-스택) &nbsp;·&nbsp;
[✨ 주요 기능](#-주요-기능) &nbsp;·&nbsp;
[🖼️ 화면 구성](#️-화면-구성) &nbsp;·&nbsp;
[📁 폴더 구조](#-폴더-구조) &nbsp;·&nbsp;
[🔗 링크](#-링크)

---

## 🚩 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 풀무원 쇼핑몰 퍼블리싱 |
| **유형** | 개인 프로젝트 (퍼블리싱) |
| **개발 기간** | 2025.03 |
| **목표** | 실제 식품 커머스 수준의 반응형 UI 구현 · AI 추천 섹션 설계 |

실제 풀무원 쇼핑몰의 구조를 분석하여 메인 페이지와 상품 서브 페이지를 퍼블리싱했습니다.  
단순 화면 복제를 넘어 **AI 취향 추천**, **재구매 추천** 섹션의 UI/UX 구조를 직접 설계하고 구현하였습니다.

---

## 🔧 기술 스택

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## ✨ 주요 기능

### 메인 페이지 (`index.html`)

**① 슬라이드 배너**
- 메인 히어로 이미지 캐러셀 구현
- 이전/다음 버튼 및 자동 재생 컨트롤

**② AI 추천 섹션 × 2**
- `#AI 취향 비슷한 고객들이 구매한 상품 추천` — 취향 기반 큐레이션 UI
- `#AI 최근 2주간 재구매 많은 상품 추천` — 재구매 데이터 기반 추천 UI
- 실제 AI 연동 없이 섹션 구조·레이블 설계로 기획 의도 구현

**③ 카테고리 탭 내비게이션**
- 베스트 · 지금세일 · 신상품 · 이벤트 · 풀무원이야기

**④ 브랜드별 상품 섹션**
- ORGA(올가홀푸드), 반듯한식, 신상품 등 브랜드별 구분 섹션
- 수평 스크롤 캐러셀로 상품 카드 나열

**⑤ 전체 브랜드 슬라이더**
- 아임리얼 · 풀무원다논 · 풀스키친 · 바릴라 등 10개+ 브랜드 슬라이더
- 이전/다음 화살표 네비게이션

---

### 서브 페이지 (`sub.html`)

**① 상품 상세 — 옵션 선택 UI**
- 용량·수량 선택, 정기배송 옵션 구성

**② 서비스 바로가기 및 상품 목록**
- 카테고리별 상품 그리드 레이아웃

---

## 🖼️ 화면 구성

> 💡 아래 이미지 슬롯에 실제 스크린샷을 업로드해서 교체하세요.  
> GitHub 편집 화면에서 이미지를 드래그하면 URL이 자동 생성됩니다.

| 메인 — AI 추천 섹션 | 메인 — 브랜드 슬라이더 |
|---|---|
| 스크린샷 이미지 업로드 | 스크린샷 이미지 업로드 |

| 서브 — 상품 상세 | 서브 — 옵션 선택 |
|---|---|
| 스크린샷 이미지 업로드 | 스크린샷 이미지 업로드 |

---

## 📁 폴더 구조

```
0311_2/
├── index.html          # 메인 페이지
├── sub.html            # 서브(상품 상세) 페이지
├── css/
│   ├── style.css       # 메인 스타일
│   └── sub.css         # 서브 페이지 스타일
├── js/
│   ├── main.js         # 메인 스크립트 (슬라이더, 캐러셀)
│   └── sub.js          # 서브 페이지 스크립트
└── img/
    ├── banner/         # 배너 이미지
    ├── 05_orga/        # 올가 브랜드 이미지
    ├── footer/         # 푸터 로고
    └── icon/           # UI 아이콘
```

---

## 🔗 링크

| | 링크 |
|---|---|
| 🌐 **라이브 데모 (메인)** | https://ebj0925-cyber.github.io/0311_2/index.html |
| 🌐 **라이브 데모 (서브)** | https://ebj0925-cyber.github.io/0311_2/sub.html |
| 👤 **포트폴리오** | https://github.com/ebj0925-cyber |

---

<p align="right">
  <sub>욤니버스 · YOMNIVERSE &nbsp;|&nbsp; 조은정</sub>
</p>
