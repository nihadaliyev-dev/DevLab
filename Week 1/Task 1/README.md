# CryptoDash - Advanced Dashboard Application

A modern, responsive cryptocurrency dashboard built with React, TypeScript, and Vite. Features a beautiful UI with smooth animations, customizable dashboard cards, and flexible navigation layouts.

## ✨ Features

### 🎛️ Settings Modal

- **Smooth slide-up animation** from the bottom of the screen
- **Card visibility controls** - Show/hide dashboard cards as needed
- **Layout toggle** - Switch between header and sidebar navigation layouts
- **Persistent settings** - All preferences saved to localStorage

### 📊 Dashboard

- **Drag & drop** card reordering with smooth animations
- **Customizable visibility** - Toggle cards on/off through settings
- **Responsive grid layout** - Adapts to different screen sizes
- **Real-time data** - Live cryptocurrency prices and market data

### 🧭 Navigation

- **Dual layout support**:
  - **Header Layout**: Traditional top navigation bar
  - **Sidebar Layout**: Modern left sidebar navigation
- **Smooth transitions** between layout modes
- **Active state indicators** for current page

### 🎨 UI/UX

- **Smooth animations** throughout the application
- **Modern gradient design** with glassmorphism effects
- **Responsive design** - Works on all device sizes
- **Dark theme** optimized for data visualization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd crypto-dashboard
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **@dnd-kit** - Drag and drop functionality
- **React Router** - Client-side routing

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard card components
│   ├── layout/            # Layout components (Header, Sidebar, etc.)
│   └── ui/                # Reusable UI components
├── contexts/              # React contexts (Settings, Theme)
├── pages/                 # Page components
├── types/                 # TypeScript type definitions
└── utils/                 # Utility functions
```

## 🎯 Key Components

### Settings System

- **SettingsContext**: Global state management for settings
- **SettingsModal**: Slide-up modal for configuration
- **Card visibility**: Toggle dashboard cards on/off
- **Layout switching**: Header vs Sidebar navigation

### Dashboard

- **Drag & Drop**: Reorderable cards with smooth animations
- **Card Management**: Dynamic card rendering based on settings
- **Responsive Grid**: Adaptive layout for different screen sizes

## 🎨 Customization

### Adding New Dashboard Cards

1. Create a new component in `src/components/dashboard/`
2. Add the card configuration to `SettingsContext.tsx`
3. Import and add to the `cardComponents` object in `Dashboard.tsx`

### Styling

- Uses Tailwind CSS for styling
- Custom animations defined in `src/index.css`
- CSS variables for consistent theming

## 📱 Responsive Design

The application is fully responsive and works on:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Error boundaries for graceful error handling

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs["recommended-typescript"],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
