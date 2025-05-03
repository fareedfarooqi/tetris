# 🎮 React Tetris

> A modern, responsive Tetris clone built with React, Vite & Tailwind CSS.  
> Smooth animations, next-piece preview, score tracking, and a mobile-friendly control panel.

---

## 🚀 Table of Contents

- [Demo](#demo)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Installation](#installation)  
  - [Running the App](#running-the-app)  
- [Controls](#controls)  
- [Screenshots](#screenshots)
- [Next Steps / To-Do](#next-steps--to-do)

---

## 📺 Demo

> **Live Preview:**  
> _(NEEEEEED TO REPLACE)_  
> https://your-tetris-app.netlify.app  

---

## ✨ Features

- 🎨 **Tailwind-powered styling** for effortless theming  
- 🧩 **Smooth CSS transitions** on piece drop & rotation  
- 👁️ **Next-piece preview** panel  
- ⏱️ **Adjustable gravity** (drops accelerate with score)  
- 💾 **High-score persistence** via `localStorage`  
- 📱 **On-screen buttons** for touchscreen controls  

---

## 🛠️ Tech Stack

- **Framework**: React 18  
- **Bundler**: Vite  
- **Styling**: Tailwind CSS  
- **Icons**: React Icons  
- **State & Effects**: React Hooks  

---

## ⚙️ Getting Started

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-username/react-tetris.git
cd react-tetris

# 2. Install dependencies
npm install
# or
yarn install

# 3. Running the app
# start dev server
npm run dev
# or
yarn dev

# Open your browser at http://localhost:5173 (or the port Vite tells you).
```

## 🕹️ Controls

Use your keyboard or the on-screen buttons:

| Action     | Keyboard            | On-Screen Button      |
|------------|---------------------|-----------------------|
| Move Left  | ← (Arrow Left)      | `<IoIosArrowBack />`  |
| Move Right | → (Arrow Right)     | `<IoIosArrowForward />` |
| Rotate     | ↑ (Arrow Up)        | `<IoMdRefresh />`     |
| Soft Drop  | ↓ (Arrow Down)      | `<IoIosArrowDown />`  |

## 📷 Screenshots



## 📝 Next Steps / To-Do

- **Hard Drop**: Implement Spacebar (` ⎵ `) hard-drop to instantly drop pieces to the bottom.  
- **Rotation Bug Fix**: Prevent the “ghost” duplication when rotating too quickly, so shapes don’t overlap into already-locked cells.

