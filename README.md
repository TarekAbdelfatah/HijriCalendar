# CoreComponents 🚀

A reference-grade monorepo suite for high-performance, standalone UI controls. Built with **Zero Dependencies**, **Pure TypeScript**, and a **Centralized Design System**.

---

## 🚀 Getting Started

Since we use isolated environments for maximum compatibility, you need to install dependencies for each project:

### 1. Install All Dependencies
```powershell
# In the root directory, this command runs install for all sub-projects
npm run install:all
```

### 2. Run the Projects
You can run all projects simultaneously with one command:
```powershell
npm run start:all
```

Or run them independently:
*   **Modern Angular (v18+)**: 
    `npm run start:angular` (Runs on [http://localhost:4200](http://localhost:4200))
*   **Legacy Angular (v9)**: 
    `npm run start:legacy` (Runs on [http://localhost:4201](http://localhost:4201))

## 🏛️ Project Hub Architecture

This project is structured as a monorepo containing the core library packages and multiple playground environments for testing and demonstration. Each environment runs on a dedicated port for seamless navigation.

| Environment | Tech Stack | Port | Status |
| :--- | :--- | :--- | :--- |
| **Modern Playground** | Angular 18+ (Standalone) | `http://localhost:4200` | ✅ Active |
| **Legacy Playground** | Angular 7/9 (NgModule) | `http://localhost:4201` | ✅ Active |
| **Vanilla Demo** | Pure JS / HTML | `(packages/calendar/demo)` | ⏳ Planned |
| **Next.js Hub** | Next.js 14 (App Router) | `http://localhost:3000` | ⏳ Planned |
| **MVC Hub** | ASP.NET Core MVC | `http://localhost:5000` | ⏳ Planned |

---

## 🏗️ Folder Structure

*   **/packages**: Contains the source code for all UI controls.
    *   `calendar/`: The core Hijri/Gregorian logic and directives.
    *   `theme/`: **Single Source of Truth** for CSS variables and design tokens.
    *   `autocomplete/`: (Planned) Modern autocomplete control.
    *   `wizard/`: (Planned) Stepper/Wizard control.
*   **/playground**: Technology-specific projects that import from `/packages`.
    *   `angular/`: Modern Angular showcase.
    *   `legacy-angular/`: Backward compatibility showcase.

---

## 🎨 Centralized Design System

All components and playgrounds use the `@core-components/theme` package. To ensure visual consistency, always use the CSS variables defined in:
`packages/theme/src/core-theme.css`

Example:
```css
.my-card {
  background: var(--primary);
  border-radius: var(--radius-md);
}
```

---

## 👨‍💻 Developer Guide

For instructions on how to create new components or add new playground environments, please refer to the [**DEVELOPER_GUIDE.md**](./DEVELOPER_GUIDE.md).

### Main Rules:
1.  **Logic must be Pure TS/JS** (No frameworks in core logic).
2.  **Styles must be Pure CSS** (Using theme variables).
3.  **Single Source of Truth**: Always link to packages, never duplicate code.

---

## 🇸🇦 Authors
Developed by **CoreComponents Team**.

---
*Created with passion for clean code and high performance.*
