# CoreComponents 🚀

A reference-grade monorepo suite for high-performance, standalone UI controls. Built with **Zero Dependencies**, **Pure TypeScript**, and a **Centralized Design System**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```powershell
npm run install:all
```

### 2. Run Development Server
```powershell
npm run start:vanilla
```
Opens at [http://localhost:4202](http://localhost:4202)

### 3. Build for Production
```powershell
npm run build
```

---

## 🏛️ Components

| Component | Status | Description |
| :--- | :--- | :--- |
| **Calendar** | ✅ Ready | Hijri/Gregorian calendar with Umm al-Qura table |
| **Autocomplete** | 🔄 In Progress | Smart search with virtual scroll |
| **Wizard** | 📋 Planned | Multi-step form handler |

---

## 🏗️ Folder Structure

```
CoreComponents/
├── index.html              # Main portal page
├── vite.config.ts          # Vite configuration
├── package.json            # Root package.json
├── calendar/               # Calendar component
│   ├── src/               # Core library
│   ├── demo/              # Documentation demo
│   └── dist/              # Built files
├── theme/                  # Design system
│   └── src/core-theme.css
├── autocomplete/           # (In Progress)
└── wizard/                 # (Planned)
```

---

## 🎨 Design System

All components use CSS variables from `theme/src/core-theme.css`.

Example:
```css
.my-card {
  background: var(--primary);
  border-radius: var(--radius-md);
}
```

---

## 📖 Documentation

Each component has its own demo page:
- **Calendar**: `calendar/demo/index.html`

---

## 👨‍💻 Developer Guide

See [**DEVELOPER_GUIDE.md**](./DEVELOPER_GUIDE.md) for:
- Creating new components
- Adding demos
- Following code standards

---

## 🇸🇦 Authors

Developed by **CoreComponents Team**.

---
*Built with passion for clean code and high performance.*
