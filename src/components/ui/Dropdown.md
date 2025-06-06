# Dropdown Component

범용적으로 사용할 수 있는 드롭다운 컴포넌트입니다. Compound Component Pattern을 사용하여 유연한 구성이 가능합니다.

## 특징

- **Compound Component Pattern**: `Dropdown.Trigger`, `Dropdown.Content`, `Dropdown.Item` 등의 하위 컴포넌트로 구성
- **유연한 구성**: children을 통해 커스텀 UI 구성 가능
- **타입 안전성**: TypeScript로 완전히 타입화
- **접근성**: 키보드 네비게이션 및 focus 관리
- **반응형**: 다양한 정렬 옵션 (left, center, right)

## 기본 사용법

```tsx
import { Dropdown } from "~/components/ui/Dropdown";

function MyDropdown() {
  return (
    <Dropdown>
      <Dropdown.Trigger class="px-4 py-2 bg-blue-500 text-white rounded">
        <span>Open Menu</span>
      </Dropdown.Trigger>
      
      <Dropdown.Content>
        <Dropdown.Item onClick={() => console.log("Option 1")}>
          <span>Option 1</span>
        </Dropdown.Item>
        <Dropdown.Item onClick={() => console.log("Option 2")}>
          <span>Option 2</span>
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item onClick={() => console.log("Option 3")}>
          <span>Option 3</span>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
```

## API 참조

### Dropdown (Root)

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | JSX.Element | - | 하위 컴포넌트들 |
| class | string | "" | 추가 CSS 클래스 |
| defaultOpen | boolean | false | 초기 열림 상태 |

### Dropdown.Trigger

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | JSX.Element | - | 트리거 버튼 내용 |
| class | string | "" | 추가 CSS 클래스 |
| asChild | boolean | false | children을 버튼으로 감싸지 않음 |

### Dropdown.Content

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | JSX.Element | - | 드롭다운 메뉴 내용 |
| class | string | "" | 추가 CSS 클래스 |
| align | "left" \| "center" \| "right" | "right" | 정렬 방향 |
| sideOffset | number | 8 | 트리거와의 거리 (px) |

### Dropdown.Item

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | JSX.Element | - | 아이템 내용 |
| class | string | "" | 추가 CSS 클래스 |
| onClick | () => void | - | 클릭 핸들러 |
| disabled | boolean | false | 비활성화 상태 |

### Dropdown.Separator

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| class | string | "" | 추가 CSS 클래스 |

## 사용 사례

### 1. NetworkSelector

```tsx
<Dropdown class="ml-auto">
  <Dropdown.Trigger class="flex items-center px-4 py-2 rounded-full bg-white/10">
    <span>Network: {network()}</span>
  </Dropdown.Trigger>
  
  <Dropdown.Content class="py-2 w-48" align="right">
    <For each={networks}>
      {(network) => (
        <Dropdown.Item onClick={() => selectNetwork(network)}>
          <span>{network}</span>
        </Dropdown.Item>
      )}
    </For>
  </Dropdown.Content>
</Dropdown>
```

### 2. CurrencySelector

```tsx
<Dropdown class="ml-auto">
  <Dropdown.Trigger class="bg-sky-700 text-white px-3 py-1 rounded-lg">
    <span>{symbol} {currency()}</span>
  </Dropdown.Trigger>
  
  <Dropdown.Content class="py-2 w-24" align="right">
    <For each={currencies}>
      {(curr) => (
        <Dropdown.Item onClick={() => setCurrency(curr)}>
          <span>{SYMBOL_BY_CURRENCY[curr]} {curr}</span>
        </Dropdown.Item>
      )}
    </For>
  </Dropdown.Content>
</Dropdown>
```

## 장점

1. **재사용성**: 다양한 드롭다운에서 사용 가능
2. **일관성**: 동일한 UI/UX 패턴 제공
3. **유지보수성**: 중앙화된 드롭다운 로직
4. **확장성**: 새로운 기능을 쉽게 추가 가능
5. **타입 안전성**: 컴파일 타임에 오류 검출
