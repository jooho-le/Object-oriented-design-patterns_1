# 디자인 패턴 데모 — Vue 3 + TypeScript

요청에 따라 아래 3가지 패턴을 시연합니다.

- 생성(Creational): Builder (빌더)
- 구조(Structural): Decorator (데코레이터)
- 행위(Behavioral): Strategy (전략)

## 실행 방법

사전 준비: Node.js 18+ (또는 20+ 권장)

```bash
npm i
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 각 섹션을 조작하여 동작을 확인하세요.

## 1) Builder

- `src/builder/ReportBuilder.ts`:
  - 인터페이스 `ReportBuilder`
  - 구상 빌더 `MarkdownReportBuilder`, `HtmlReportBuilder`
  - 디렉터 `ReportDirector`

핵심: 빌드 절차(제목 설정 → 섹션 추가)를 디렉터가 캡슐화, 빌더 교체만으로 산출물(Markdown/HTML)을 변경.

## 2) Decorator

- `src/decorator/TextDecorator.ts`:
  - 컴포넌트 `TextComponent` / `PlainText`
  - 데코레이터 베이스 `TextDecorator`
  - 구상 데코레이터 `BoldDecorator`, `ItalicDecorator`, `EmojiDecorator`

핵심: 런타임에 꾸미기 기능을 조합해 문자열 렌더링 결과를 확장합니다.

## 3) Strategy

- `src/strategy/TextStrategy.ts`:
  - 전략 인터페이스(`TextFormatter`)
  - 구상 전략(`UpperCaseFormatter`, `LowerCaseFormatter`, `TitleCaseFormatter`)
  - 컨텍스트(`TextContext`)

핵심: 런타임에 전략을 교체해 텍스트 변환 동작을 바꿉니다.
