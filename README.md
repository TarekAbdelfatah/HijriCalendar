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
```powershell
npm run start:vanilla
```
Runs on [http://localhost:4202](http://localhost:4202)

## 🏛️ Project Structure

| Component | Tech Stack | Status |
| :--- | :--- | :--- |
| **Calendar** | Vanilla JS / TypeScript | ✅ Ready |
| **Autocomplete** | Vanilla JS / TypeScript | 🔄 In Progress |
| **Wizard** | Vanilla JS / TypeScript | 📋 Planned |

---

## 🏗️ Folder Structure

*   **/calendar**: The core Hijri/Gregorian logic and demo.
*   **/theme**: **Single Source of Truth** for CSS variables and design tokens.
*   **/autocomplete**: (In Progress) Modern autocomplete control.
*   **/wizard**: (Planned) Stepper/Wizard control.

---

## 🎨 Centralized Design System

All components use the `@core-components/theme` package. Use the CSS variables defined in:
`theme/src/core-theme.css`

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
