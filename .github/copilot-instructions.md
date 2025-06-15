# Codebase Improvement Guidelines

## Objective

The goal of this document is to provide guidelines and best practices for improving the `9c-market` codebase. Key objectives include:

-   **Enhance Readability**: Make the code easier to understand and maintain.
-   **Increase Maintainability**: Write code that is easy to change and extend.
-   **Strengthen SOLID Principles Adherence**: Further reinforce and consistently apply already adopted SOLID principles.
-   **Optimize Performance**: Identify and improve performance bottlenecks where necessary.
-   **Expand Test Coverage**: Enhance code stability by strengthening unit and integration tests.

## Current Codebase Overview

-   **Main Tech Stack**: SolidJS, TypeScript
-   **State Management**: Utilizes SolidJS Context API
-   **Styling**: CSS Modules or global CSS (`app.css`)
-   **API Communication**: Uses `fetch` API or similar libraries (e.g., `src/lib/api.ts`)
-   **Testing**: Vitest

**References**: For comprehensive SolidJS documentation and best practices for LLMs, refer to:
- SolidJS: https://context7.com/solidjs/solid-docs/llms.txt
- SolidStart: https://context7.com/solidjs/solid-start/llms.txt
- SolidUI: https://context7.com/stefan-karger/solid-ui/llms.txt

## Improvement Directions and Considerations

### 1. Code Style and Consistency

-   Maintain consistent code style by adhering to Prettier and ESLint configurations.
-   Use meaningful variable, function, and class names.
-   Write clear and concise comments only when necessary (retain already well-written comments).

### 2. Strengthening SOLID Principles Application

-   **Single Responsibility Principle (SRP)**: Ensure components, functions, and classes have only one responsibility. `IProductListRenderer` in `IMarketProductService.ts` follows SRP well. Apply this pattern elsewhere.
-   **Open/Closed Principle (OCP)**: Design code to be extensible for new features without modifying existing code. `IProductSortService` is a good example of OCP.
-   **Liskov Substitution Principle (LSP)**: Subtypes must always be substitutable for their base types. Adhere to this principle in the relationship between interfaces and their implementations.
-   **Interface Segregation Principle (ISP)**: Keep interfaces small so that clients do not depend on interfaces they do not use.
-   **Dependency Inversion Principle (DIP)**: Depend on abstractions rather than concrete implementations. `IMarketProductService` follows DIP well. Actively consider using the Dependency Injection (DI) container (`src/utils/DIContainer.ts`).

### 3. Component Design

-   Break down components into small, reusable units whenever possible.
-   Clearly define props, using `interface` or `type` if necessary.
-   Appropriately utilize SolidJS signals and contexts for state management. Manage complex global state via the Context API.

### 4. TypeScript Utilization

-   Minimize the use of the `any` type; specify concrete types whenever possible.
-   Appropriately distinguish between `interface` and `type`. (Primarily use `interface` for data structures and `type` for utility or composite types).
-   Enhance runtime type safety by utilizing type guards.
-   Files containing JSX code must use the `.tsx` extension.

### 5. Asynchronous Processing

-   Use `async/await` consistently.
-   Thoroughly handle Promise errors (e.g., `try...catch`, `.catch()`).
-   Clearly display loading and error states in the UI.

### 6. Testing

-   Write unit tests for key features and logic (using Vitest).
-   Add tests for component rendering and interaction if necessary.
-   Write clear and understandable test code.

### 7. Documentation

-   Add explanations for functions, interfaces, and key logic using JSDoc-style comments.
-   Document complex logic or architectural decisions in README or separate documents.
-   If new guidelines arise during development, please update this `copilot-instructions.md` file accordingly.

## Specific Improvement Suggestions (Examples)

-   **Identifying Refactoring Targets**:
    -   Consider splitting files if a single file contains too much code or if a single function/component does too much.
    -   Extract duplicated logic into utility functions or services.
-   **Performance Review**:
    -   Verify proper utilization of SolidJS rendering optimization techniques (e.g., `createMemo`, `<For>`, `<Show>`).
    -   Minimize network requests and introduce caching strategies if needed.
-   **Error Handling Improvement**:
    -   Consistently use the global error handler (`src/utils/ErrorHandler.ts`) and provide user-friendly error messages.

## Work Procedure

1.  Identify the specific part to be improved (file, module, feature).
2.  Analyze and understand the relevant existing code.
3.  Design improvements according to the guidelines above.
4.  Modify the code and create new files if necessary.
5.  Write unit tests or update existing tests.
6.  Review and test the changes. **It is mandatory to perform the following steps after modifying files:**
    -   **Validation**: Run `yarn validate` to format, type check, and test the code.

This document is a living document and may be continuously updated according to project progress.
