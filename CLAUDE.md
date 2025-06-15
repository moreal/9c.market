# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A SolidJS web application for browsing and comparing Nine Chronicles market products and IAP (In-App Purchase) products. Uses TypeScript with comprehensive dependency injection architecture following SOLID principles.

## Essential Commands

**Development:**
- `yarn dev` - Start development server
- `yarn validate` - Full validation (format, typecheck, lint, test) - **run after any code changes**
- `yarn typecheck` - Type checking only
- `yarn test` - Run tests
- `yarn test:ui` - Run tests with UI

**Code Quality:**
- `yarn fmt` - Format code with biome
- `yarn lint` - Lint with biome, oxlint, and eslint

**Build & Deploy:**
- `yarn build` - Build for production
- `flyctl deploy` - Deploy to fly.io
- `docker build .` - Build Docker image

## Architecture

**Framework:** SolidJS with SolidStart
**Key Technologies:** TypeScript, TailwindCSS, Vitest, Vinxi

**Context Hierarchy (Providers.tsx):**
1. NetworkProvider (odin/heimdall network selection)
2. CurrencyProvider (USD, EUR, JPY, KRW, PHP, VND)
3. WNCGPriceProvider (WNCG price fetching)
4. ProductsProvider (product data management)

**Dependency Injection:** 
- Central DIContainer (`src/utils/DIContainer.ts`) following SOLID principles
- Services implement interfaces for testability and extensibility
- Factory patterns for different sorting strategies

**API Integration:**
- Market API: `https://api.9capi.com`
- Product API: AWS Lambda endpoint
- Price APIs: `9c.market/data` and `coinprice-api.9c.market`

**Key Services:**
- MarketProductService - Product data fetching/processing
- CurrencyConverter - Multi-currency price conversion
- ProductSortService - Configurable sorting strategies
- ErrorHandler - Global error management

**Testing:** Vitest with jsdom environment, comprehensive unit tests for services and components.

## SolidJS Documentation References

When working with SolidJS-related features, refer to these comprehensive documentation sources:
- **SolidJS Core**: Use Context7 library ID `/solidjs/solid-docs` for framework patterns, reactivity, and best practices
- **SolidStart**: Use Context7 library ID `/solidjs/solid-start` for SSR, routing, and data loading patterns
- **SolidUI**: Use Context7 library ID `/stefan-karger/solid-ui` for component library and styling patterns
- **Solid Primitives**: Use Context7 library ID `/solidjs-community/solid-primitives` for utility primitives

### Key SolidJS Patterns to Follow:
- **Context Creation**: Always use `createContext` with default values and custom hooks with error handling
- **Memoization**: Prefer `createMemo` over functions for derived state to prevent redundant computations
- **State Stores**: Use `createStore` for complex nested state instead of multiple individual signals
- **Control Flow**: Use `<Show>`, `<For>`, `<Switch>/<Match>` instead of conditional JSX operators
- **Resource Management**: Use `createResource` for async data fetching with proper Suspense boundaries
- **Props Handling**: Implement `splitProps` pattern for component prop forwarding and separation

## Code Standards

**SOLID Principles Adherence:**
- Use interfaces for service contracts (IMarketProductService, IProductSortService)
- Leverage DIContainer for dependency management
- Follow existing patterns for new services/components

**TypeScript:**
- Minimize `any` usage
- Use interfaces for data structures, types for utilities
- JSX files must use `.tsx` extension
- Implement type guards for runtime safety

**SolidJS Best Practices:**
- **Context Management**: Create custom hooks with error handling for context consumption
- **Performance**: Use `createMemo` for expensive calculations to prevent redundant computations
- **State Management**: Use `createStore` for complex state instead of multiple signals
- **Reactivity**: Leverage control flow components (`<For>`, `<Show>`) for conditional rendering
- **Prop Handling**: Use `splitProps` for cleaner component prop separation and forwarding
- **Data Fetching**: Separate data fetching logic using `createResource` pattern
- **Type Safety**: Implement proper TypeScript Context interfaces with error boundaries
- **Component Patterns**: Extract complex components into smaller, focused units
- **Lifecycle Management**: Use `onCleanup` for proper resource cleanup

**Required Validation:**
Always run `yarn validate` after code changes - this is mandatory per project guidelines.

## Git Commit Guidelines
- Commit for each job with Co-Authored-by Claude
- Commit when every phase(or step) finished.