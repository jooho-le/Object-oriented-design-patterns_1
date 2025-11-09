# 디자인 패턴 데모 — Vue 3 + TypeScript

Vue 3 + TypeScript로 세 가지 분류에서 각 1개씩 구현했습니다.

- 생성(Creational): Factory Method
- 구조(Structural): Adapter
- 행위(Behavioral): Strategy

## 실행 방법

사전 준비: Node.js 18+ (또는 20+ 권장)

```bash
npm i
npm run dev
```

브라우저에서 `http://localhost:5173` 접속 후 각 섹션을 조작하여 동작을 확인하세요.

## 1) Factory Method

- `src/factory/Product.ts`: Product 인터페이스(`Button`)
- `src/factory/Creator.ts`: 추상 Creator(`Dialog`), `createButton()` 팩토리 메서드
- `src/factory/ConcreteProducts.ts`: 구상 Product(`HtmlButton`, `WindowsButton`)
- `src/factory/ConcreteCreators.ts`: 구상 Creator(`WebDialog`, `WindowsDialog`)

핵심: 클라이언트는 추상 `Dialog`에 의존하고, 인스턴스 생성은 팩토리 메서드에 위임됩니다.

## 2) Adapter

- `src/adapter/Notifier.ts`: Target 인터페이스(`Notifier`)
- `src/adapter/ConcreteTargets.ts`:
  - `ConsoleNotifier`(Target 구현)
  - `LegacyLogger`(Adaptee)
  - `LegacyLoggerAdapter`(Adapter)

핵심: 호환되지 않는 `LegacyLogger`를 `Notifier` 인터페이스에 맞춰 변환합니다.

## 3) Strategy

- `src/strategy/TextStrategy.ts`:
  - 전략 인터페이스(`TextFormatter`)
  - 구상 전략(`UpperCaseFormatter`, `LowerCaseFormatter`, `TitleCaseFormatter`)
  - 컨텍스트(`TextContext`)

핵심: 런타임에 전략을 교체해 텍스트 변환 동작을 바꿉니다.
