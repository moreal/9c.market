# 9c-Market Readability Refactoring Plan

## High Priority Issues

### 1. Component Organization & Naming Consistency
**Problem**: Duplicate components with different implementations
- `src/components/nav/Nav.tsx` vs `src/components/layout/Nav.tsx` (completely different)
- `src/components/ui/LoadingSpinner.tsx` vs `src/components/common/LoadingSpinner.tsx` (different styles)

**Solutions**:
- Remove unused/duplicate components
- Consolidate to single implementations
- Standardize component naming patterns

### 2. Complex Component Simplification
**Problem**: `MarketProduct.tsx` (167 lines) has multiple responsibilities
- Product rendering logic
- Price calculation
- Multiple sub-components in same file

**SolidJS Best Practice Solutions**:
- Extract `ProductHeader` and `ProductPriceGrid` to separate files
- Use `createMemo` for expensive price calculations to prevent redundant computations
- Implement `splitProps` pattern for better prop handling and forwarding
- Simplify main component logic using SolidJS control flow components (`<For>`, `<Show>`)

### 3. Context Provider Optimization
**Problem**: `ProductsContext.tsx` (180 lines) is overly complex
- Mixed data fetching and business logic
- Large helper object with multiple responsibilities
- Complex price calculation logic

**SolidJS Context Best Practices**:
- Extract `ProductHelpers` to separate utility file
- Create dedicated service for price calculations
- Simplify context to focus on state management only
- Implement custom hooks with proper error handling (`useProductsContext`)
- Use `createStore` for complex state instead of multiple signals
- Separate data fetching logic from context provider

## Medium Priority Issues

### 4. Service Layer Improvements
**Problem**: Some services are too thin while others are too complex
- `MarketProductService` only has one method
- `ProductListRenderer` mixes rendering with error handling

**Solutions**:
- Consider consolidating thin services
- Extract error handling to dedicated error boundary components
- Improve service interfaces for better testability

### 5. Type Definitions Enhancement
**Problem**: Some complex interfaces could be clearer
- Long generic type definitions in `Money.ts`
- Mixed concerns in some type files

**Solutions**:
- Add more descriptive type aliases
- Improve JSDoc documentation
- Separate business logic types from API types

### 6. Localization Consistency
**Problem**: Mixed Korean/English text in components
- `ProductListRenderer.tsx` has Korean error messages
- Inconsistent throughout codebase

**Solutions**:
- Standardize to English for consistency
- Consider i18n structure if multilingual support needed

## Implementation Steps

### Phase 1: Remove Duplicates & Fix Naming (30 min)
1. **Remove duplicate Nav components**
   - Keep `src/components/nav/Nav.tsx` (fully implemented)
   - Remove `src/components/layout/Nav.tsx` (basic/unused)
   - Update imports if needed

2. **Remove duplicate LoadingSpinner components**
   - Keep `src/components/ui/LoadingSpinner.tsx` (better implementation)
   - Remove `src/components/common/LoadingSpinner.tsx`
   - Update imports to use ui version

3. **Check for other duplicate components**
   - Scan for similar patterns
   - Remove unused duplicates

### Phase 2: Extract Complex Components (45 min)
4. **Break down MarketProduct.tsx using SolidJS patterns**
   - Extract `ProductHeader` → `src/components/market/ProductHeader.tsx`
   - Extract `ProductPriceGrid` → `src/components/market/ProductPriceGrid.tsx`
   - Replace expensive functions with `createMemo` for price calculations
   - Use `splitProps` to cleanly separate props for child components
   - Implement proper control flow with `<Show>` and `<For>` components
   - Simplify main `MarketProduct` component

### Phase 3: Optimize Context Providers with SolidJS Best Practices (60 min)
5. **Refactor ProductsContext.tsx following SolidJS patterns**
   - Extract `ProductHelpers` → `src/utils/ProductHelpers.ts`
   - Create `src/services/ProductPriceService.ts` for price calculations
   - Implement custom `useProductsContext` hook with error handling
   - Use `createStore` for complex state management instead of multiple signals
   - Separate data fetching logic from context provider (use `createResource`)
   - Add proper TypeScript types with Context interface
   - Improve type definitions and JSDoc

### Phase 4: Service & Error Handling (30 min)
6. **Improve service layer**
   - Extract error handling from `ProductListRenderer` to error boundary
   - Consider service consolidation opportunities
   - Improve service interfaces

### Phase 5: Localization & Documentation (20 min)
7. **Fix localization consistency**
   - Replace Korean text with English in `ProductListRenderer.tsx`
   - Check for other mixed language instances
   - Improve JSDoc documentation

## Validation Process
- Run `yarn validate` after each phase
- Ensure all tests pass
- Check that UI renders correctly
- Verify no TypeScript errors

## Expected Outcomes
- Reduced code duplication
- Smaller, more focused components following SolidJS patterns
- Clearer separation of concerns with proper context usage
- Better maintainability and testability with memoized computations
- Consistent naming and structure
- Improved documentation
- Enhanced performance through proper use of `createMemo` and reactive patterns
- Better TypeScript integration with Context interfaces
- Proper error handling in context consumers

## SolidJS-Specific Improvements
- **Performance**: Use `createMemo` for expensive calculations to prevent redundant computations
- **Reactivity**: Leverage SolidJS control flow components (`<Show>`, `<For>`) for conditional rendering
- **State Management**: Use `createStore` for complex state instead of multiple signals
- **Context Patterns**: Implement custom hooks with proper error handling for context consumption
- **Prop Handling**: Use `splitProps` for cleaner component prop separation
- **Data Fetching**: Separate data fetching concerns using `createResource` pattern
- **Type Safety**: Implement proper TypeScript Context interfaces with error boundaries

## Total Estimated Time: ~3 hours