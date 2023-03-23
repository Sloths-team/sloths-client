# 개발 포트폴리오 프론트

```bash
> yarn
> yarn dev #http:localhost:3000
```

## 스택
- `Next.js`

## 페이지

- /: 홈

- /login: 로그인
- /signup: 회원가입
- /forgot_password: 비밀번호 찾기

- /profile: 프로필

- /portfolios: 포트폴리오 전체 보기
- /portfolios/:id: 포트폴리오 상세 보기

- /projects: 프로젝트 전체 보기
- /projects/:id: 프로젝트 상세 보기
- /projects/new: 프로젝트 생성

- /sections/new: 섹션 생성


## 상태 관리(with `context api`)

- `useSession`: 세션(토큰), 로그인, 회원가입, 로그아웃 (+localStorage)
- `useProject`: 프로젝트 정보 (+localStorage)
- `useSectons`: 섹션 정보, 섹션 추가&삭제&변경, 이미지 추가&삭제&변경 (+localStorage)
- `useUI`: Layout 및 모달

## 그 외

- 페이지 구분 대신 모달로 뷰(view) 컨트롤!
- `SEO` 구현


