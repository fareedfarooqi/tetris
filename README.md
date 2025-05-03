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

![Screenshot 2025-05-04 at 1 14 51 am](https://github.com/user-attachments/assets/2de7552e-4a0a-4f27-b780-59a261b93454)

![Screenshot 2025-05-04 at 1 15 22 am](https://github.com/user-attachments/assets/48369172-bddf-4dba-89ac-cf3698f4e21d)

![Screenshot 2025-05-04 at 1 16 19 am](https://github.com/user-attachments/assets/bbb9fe68-b555-447e-a2d0-1bd27daf1c51)

![Screenshot 2025-05-04 at 1 17 24 am](https://github.com/user-attachments/assets/dd366e6b-1ef7-4eaa-9056-5192ca2915f3)


## 📝 Next Steps / To-Do

- **Hard Drop**: Implement Spacebar (` ⎵ `) hard-drop to instantly drop pieces to the bottom.  
- **Rotation Bug Fix**: Prevent the “ghost” duplication when rotating too quickly, so shapes don’t overlap into already-locked cells.

