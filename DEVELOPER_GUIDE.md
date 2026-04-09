# CoreComponents Development Guide 🚀

This guide outlines the standards and methodology for contributing to the **CoreComponents** suite. Please follow these rules to ensure high performance, portability, and consistency.

---

## 🏗️ 1. Creating a New Component

Every component in this library must be built as a standalone package within the `packages/` directory.

### Core Principles
1.  **Pure Logic**: Use **Pure TypeScript/JavaScript** only. **Zero external dependencies** (No jQuery, No Bootstrap, etc.).
2.  **Portable Styling**: Use **Vanilla CSS** with centralized variables from `@core-components/theme`. Styles should be encapsulated (preferably inline or injected via JS to ensure portability).
3.  **Theme Driven**: Never hardcode colors. Always use `--primary`, `--secondary`, etc.
4.  **Framework Agnostic**: The core logic must be usable in any environment (Vanilla JS, React, Angular, Vue, etc.).

### Folder Structure
```text
packages/[component-name]/
├── src/
│   ├── [component].lib.ts       # Core logic
│   └── [component].styles.css   # Component-specific styles
├── demo/
│   └── index.html               # Absolute minimal Vanilla JS demo
└── package.json
```

---

## 🧪 2. Playground & Showcase Standards

Every component **must** be implemented in all relevant playground projects (Angular, Legacy, Next.js, etc.).

### Mandatory Showcase Sections
Each showcase page must follow this top-down structure:

1.  **Top Navigation (The Hub)**: A header with icons representing each playground environment (Angular icon -> link to :4200, Legacy icon -> link to :4201, etc.).
2.  **Setup & Installation**: Clear instructions on how to import and initialize the component in that specific environment.
3.  **Live Interaction Playground**:
    *   One section for each property/feature.
    *   A **Live Demo** area where users can interact with the component.
    *   A **Code Snapshot** area (Copy-to-clipboard ready) showing the exact code for that specific feature.
4.  **Shared Design Language**: All playground pages must import and use `@core-components/theme` for their layout and UI buttons.

---

## 🔗 3. Single Source of Truth
Never copy logic files into the playground. Always link them:
*   In **Angular/TypeScript**: Use `tsconfig.json` paths mapping.
*   In **Next.js**: Use npm workspace linking.
*   In **Vanilla JS**: Reference the common package file via relative paths.

---

## 🎨 4. CSS Variable Usage
Always import the theme:
```css
@import "@core-components/theme";

.my-component {
    background-color: var(--primary);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-md);
}
```

---

*By following this roadmap, we ensure CoreComponents remains the most performant and compatible UI suite for any Arabic/Hijri based application.*
